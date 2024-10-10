import express from "express";

import eventValidation from "../../validations/event.validation.js";
import validate from "../../middlewares/validate.js";
import upload from "../../middlewares/upload.js";
import controllers from "./controllers.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  validate(eventValidation.add),
  controllers.post
);
router.get("/specific/:id", controllers.getById);
router.get("/related/:id", controllers.relatedEvent);
router.get("/today", controllers.getEventForToday);
router.get("/upcoming", controllers.getAllEventsExceptToday);
router.get("/date", controllers.getEventsByDate);
router.get("/name", controllers.searchEventsByName);
router.post("/filter", controllers.filterEvents);

export default router;
