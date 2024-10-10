import EventModel from "../models/event.js";
import UserModel from "../models/user.js";

// import upload from "./middlewares/upload.js";

const EventService = {
  add: async (req) => {
    try {
      req.body.user_id = req.user._id;
      if (req.file) {
        // Assuming you save the file URL in the database
        req.body.image = `/uploads/${req.file.filename}`;
      }

      const user = await UserModel.findById(req.user._id);

      if (user.role !== "BUSINESS") {
        return {
          message: "unauthorized",
          data: "Only users with the role 'business' can create events.",
        };
      }

      const data = await EventModel.findOne({
        event_name: req.body.event_name,
      });
      if (data) {
        return { message: "failed", data: "Event already exist" };
      }

      const savedData = await EventModel.create(req.body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getById: async (id) => {
    try {
      const data = await EventModel.findById(id);
      if (!data) {
        return { message: "Event not Found", data };
      }
      const user = await UserModel.findById(data.user_id).select({
        password: 0,
      });
      return { message: "success", data: { data, user } };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getEventsForToday: async (req) => {
    try {
      const location = req.body.location;
      const radius = req.body.radius;
      const pipeline = [];

      // Geospatial query stage
      if (location && location.coordinates && radius) {
        const [longitude, latitude] = location.coordinates;
        pipeline.push({
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [
                  [parseFloat(longitude), parseFloat(latitude)],
                  radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
                ],
              },
            },
          },
        });
      }
      // Get the current date and set the time to the start of the day
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Calculate the next day and set the time to the start of that day
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      pipeline.push({
        $match: {
          date: { $gte: today, $lt: tomorrow },
        },
      });
      // Find events for the user that are scheduled for today
      const events = await EventModel.aggregate(pipeline);

      if (events.length > 0) {
        return { message: "success", data: events };
      } else {
        return { message: "no events found for today", data: [] };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getAllEventsExceptToday: async (req) => {
    try {
      const location = req.body.location;
      const radius = req.body.radius;
      const pipeline = [];

      // Geospatial query stage
      if (location && location.coordinates && radius) {
        const [longitude, latitude] = location.coordinates;
        pipeline.push({
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [
                  [parseFloat(longitude), parseFloat(latitude)],
                  radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
                ],
              },
            },
          },
        });
      }
      // Get the current date and set the time to the start of the day
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      pipeline.push({
        $match: {
          date: { $gte: tomorrow },
        },
      });

      // Find events scheduled for dates other than today
      const events = await EventModel.aggregate(pipeline);

      if (events.length > 0) {
        return { message: "success", data: events };
      } else {
        return { message: "no past events found", data: [] };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getEventsByDate: async (req) => {
    try {
      const date = req.body.date;
      // Assuming `date` is a string in ISO format (e.g., "2023-12-31")
      const events = await EventModel.find({ date: new Date(date) });

      if (events.length > 0) {
        return { message: "Events found for the specified date", data: events };
      } else {
        return { message: "No events found for the specified date", data: [] };
      }
    } catch (error) {
      return {
        message: "Error retrieving events by date",
        data: error.message,
      };
    }
  },

  relatedEvent: async (id) => {
    try {
      const prof = await EventModel.findById(id);
      const cat = prof.category;
      if (prof) {
        const events = await EventModel.find({ category: cat });
        if (events.length > 0) {
          return { message: "success", data: { events: events } };
        } else {
          return { message: "", data: { events: [] } };
        }
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  searchEventsByField: async (req) => {
    try {
      const name = req.body.name;
      const events = await EventModel.aggregate([
        {
          $match: {
            event_name: { $regex: `.*${name}.*`, $options: "i" },
          },
        },
      ]);

      if (events.length > 0) {
        return { message: `Events found matching`, data: events };
      } else {
        return { message: `No events found matching`, data: [] };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  filterEvents: async (req) => {
    try {
      const category = req.body.category;
      const date = req.body.date;
      const country = req.body.country;
      const location = req.body.location;
      const radius = req.body.radius;
      let matchStage = {};

      // Prepare match stage based on provided filters
      if (category) {
        matchStage.category = category;
      }
      if (date) {
        // Assuming date is a string in ISO format, convert to Date object
        matchStage.date = new Date(date);
      }
      if (country) {
        matchStage.country = country;
      }

      const pipeline = [];

      // Geospatial query stage
      if (location && location.coordinates && radius) {
        const [longitude, latitude] = location.coordinates;
        pipeline.push({
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [
                  [parseFloat(longitude), parseFloat(latitude)],
                  radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
                ],
              },
            },
          },
        });
      }

      // Regular matching stage
      if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }

      // Execute aggregation pipeline
      const events = await EventModel.aggregate(pipeline);

      if (events.length > 0) {
        return { message: `Events found matching the filters`, data: events };
      } else {
        return { message: `No events found matching the filters`, data: [] };
      }
    } catch (error) {
      return { message: `Error filtering events`, data: error.message };
    }
  },
};

export default EventService;
