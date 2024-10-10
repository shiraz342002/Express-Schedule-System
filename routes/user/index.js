import express from "express"
import authValidation from "../../validations/user.validation.js"
import validate from "../../middlewares/validate.js"
import controllers from "./controllers.js"
import authenticate from "../../middlewares/authenticate.js"

const router = express.Router();

router.post("/login", validate(authValidation.login), controllers.login);
router.post("/register", validate(authValidation.register), controllers.register);
router.get("/profile", authenticate, controllers.userProfile);
router.patch("/profile/update", authenticate, validate(authValidation.update), controllers.update);


export default router;
