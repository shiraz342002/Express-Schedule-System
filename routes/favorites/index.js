import express from "express"
import favValidation from "../../validations/favorite.validation.js"
import validate from "../../middlewares/validate.js"
import controllers from "./controller.js"
import authenticate from "../../middlewares/authenticate.js"

const router = express.Router();

router.get("/:id",validate(favValidation.fav), authenticate, controllers.favorite);
router.get("/", authenticate, controllers.getUserFavorite);
router.delete("/:id", authenticate, controllers.Unfavorite);



export default router;
