import express from "express";

// routes

import userRoute from "./user/index.js";
import eventRoute from "./event/index.js";
import favoriteRoute from "./favorites/index.js";
import authenticate from "../middlewares/authenticate.js";

const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/event", eventRoute);
protectedRouter.use("/favorite", favoriteRoute);

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);
unProtectedRouter.use("/event", eventRoute);

export { protectedRouter, unProtectedRouter };
