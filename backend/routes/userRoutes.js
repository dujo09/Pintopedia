import express from "express";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import userController from "../controllers/userController.js";
import usersSchemas from "../validationSchemas/usersSchemas.js";

const userRouter = express.Router();

userRouter.post(
  "/login",
  validateDataMiddleware(usersSchemas.login),
  userController.login,
);

export default userRouter;
