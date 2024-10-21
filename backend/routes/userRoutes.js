import express from "express";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import userController from "../controllers/userController.js";
import usersSchemas from "../validationSchemas/usersSchemas.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const userRouter = express.Router();

userRouter.post(
  "/login",
  validateDataMiddleware(usersSchemas.login),
  userController.login,
);

userRouter.put(
  "/like-beer/:id",
  authenticateToken,
  validateDataMiddleware(usersSchemas.likeBeerById),
  userController.likeBeerById,
);

export default userRouter;
