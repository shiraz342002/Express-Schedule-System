import FavoriteService from "../../services/favorite.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
  favorite: async (req, res) => {
    try {
      const user_id = req.user._id;
      const event_id = req.params.id;

      const addResponse = await FavoriteService.addToFavorites(
        user_id,
        event_id
      );
      if (addResponse.message === "success") {
        return httpResponse.CREATED(res, addResponse.data);
      } else if (addResponse.message === "failed") {
        return httpResponse.CONFLICT(res, addResponse.data);
      }
    } catch {
      return httpResponse.INTERNAL_SERVER(res, addResponse.data);
    }
  },
  Unfavorite: async (req, res) => {
    try {
      const user_id = req.user._id;
      const event_id = req.params.id;

      const addResponse = await FavoriteService.removeFromFavorites(
        user_id,
        event_id
      );
      if (addResponse.message === "success") {
        return httpResponse.SUCCESS(res, addResponse.data);
      } 
    } catch {
      return httpResponse.INTERNAL_SERVER(res, addResponse.data);
    }
  },

  getUserFavorite: async (req, res) => {
    try {
      const user_id = req.user._id;
      const data = await FavoriteService.getUserFavorites(user_id);
      // console.log(data);
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
        return httpResponse.NOT_FOUND(res, error);
    }
  },
};

export default controller;
