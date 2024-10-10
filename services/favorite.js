import FavoriteModel from "../models/favorite.js";
// import upload from "./middlewares/upload.js";

const FavoriteService = {
  addToFavorites: async (user_id, event_id) => {
    try {
      // Check if the favorite already exists
      const existingFavorite = await FavoriteModel.findOne({
        user_id,
        event_id,
      });
      if (existingFavorite) {
        return { message: "failed", data: "Event already Favorite" };
      }

      // Create a new favorite
      const favorite = await FavoriteModel.create({ user_id, event_id });
      if (favorite) {
        return { message: "success", data: favorite };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  removeFromFavorites: async (user_id, event_id) => {
    try {
      // Check if the favorite already exists
      const result = await FavoriteModel.deleteOne({
        user_id,
        event_id,
      });
      
      if (result.deletedCount === 0) {
       return{ message :"Event not found in favorites", data};
      }
  
     
        return { message: "success", data: result };
      
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getUserFavorites: async (user_id) => {
    try {
      const favorites = await FavoriteModel.find({ user_id }).populate("event_id")
      // console.log(favorites)
      if (!favorites) {
        
        return { message: "Event not Found", data};
       
      } 
      return { message: "success", data:favorites  };

    } catch (error) {
      return {
        message: "Error retrieving user's favorites",
        data: error.message,
      };
    }
  },
};

export default FavoriteService;
