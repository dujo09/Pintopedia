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
manufacturerRouter.post(
  "/",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.createManufacturer),
  manufacturerController.createManufacturer,
);
manufacturerRouter.get(
  "/:manufacturerId",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.getManufacturerById),
  manufacturerController.getManufacturerById,
);
manufacturerRouter.put(
  "/:manufacturerId",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.updateManufacturerById),
  manufacturerController.updateManufacturerById,
);
manufacturerRouter.delete(
  "/:manufacturerId",
  authenticateToken,
  validateDataMiddleware(manufacturersSchemas.deleteManufacturerById),
  manufacturerController.deleteManufacturerById,
);

export default manufacturerRouter;
