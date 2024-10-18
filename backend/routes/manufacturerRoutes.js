import express from "express";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import manufacturerController from "../controllers/manufacturerController.js";
import manufacturersSchemas from "../validationSchemas/manufacturersSchemas.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const manufacturerRouter = express.Router();

manufacturerRouter.get(
  "/",
  authenticateToken,
  manufacturerController.getAllManufacturers,
);
manufacturerRouter.get(
  "/:id",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.getManufacturerById),
  manufacturerController.getManufacturerById,
);
manufacturerRouter.put(
  "/:id",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.updateManufacturerById),
  manufacturerController.updateManufacturerById,
);
manufacturerRouter.delete(
  "/:id",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.deleteManufacturerById),
  manufacturerController.deleteManufacturerById,
);

export default manufacturerRouter;
