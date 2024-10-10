import EventService from "../../services/event.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
  post: async (req, res) => {
    const data = await EventService.add(req);
    console.log(data);
    if (data.message === "success") {
      return httpResponse.CREATED(res, data.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, data.data);
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await EventService.getById(id);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.NOT_FOUND(res, error);
    }
  },

  getEventForToday: async (req, res) => {
    try {
      const data = await EventService.getEventsForToday(req);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.NOT_FOUND(res, error);
    }
  },

  getAllEventsExceptToday: async (req, res) => {
    try {
      const data = await EventService.getAllEventsExceptToday(req);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.NOT_FOUND(res, error);
    }
  },

  getEventsByDate: async (req, res) => {
    try {
      const data = await EventService.getEventsByDate(req);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.NOT_FOUND(res, error);
    }
  },

  relatedEvent: async (req, res) => {
    try {
      const data = await EventService.relatedEvent(req.params.id);
      if (data.message === "success") {
        return httpResponse.SUCCESS(res, data.data);
      }
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error);
    }
  },

  searchEventsByName: async (req, res) => {
    try {
      const data = await EventService.searchEventsByField(req);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error);
    }
  },

  filterEvents: async (req, res) => {
    try {
      const data = await EventService.filterEvents(req);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error);
    }
  },
};

export default controller;
