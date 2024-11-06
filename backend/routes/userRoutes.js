import express from "express";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import userController from "../controllers/userController.js";
import usersSchemas from "../validationSchemas/usersSchemas.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const userRouter = express.Router();

userRouter.get(
  "/:userId",
  authenticateToken,
  validateDataMiddleware(usersSchemas.getUserById),
  userController.getUserById,
);

userRouter.post(
  "/login",
  validateDataMiddleware(usersSchemas.login),
  userController.login,
);
userRouter.post(
  "/register",
  validateDataMiddleware(usersSchemas.register),
  userController.register,
);

userRouter.put(
  "/like-beer/:id",
  authenticateToken,
  validateDataMiddleware(usersSchemas.likeBeerById),
  userController.likeBeerById,
);

userRouter.put(
  "/:userId",
  authenticateToken,
  validateDataMiddleware(usersSchemas.updateUserById),
  userController.updateUserById,
);

export default userRouter;
