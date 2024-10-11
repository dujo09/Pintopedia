import express from "express";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import manufacturerController from "../controllers/manufacturerController.js";
import manufacturersSchemas from "../validationSchemas/manufacturersSchemas.js";

const manufacturerRouter = express.Router();

manufacturerRouter.get("/", manufacturerController.getAllManufacturers);
manufacturerRouter.get(
  "/:id",
  validateDataMiddleware(manufacturersSchemas.getManufacturerById),
  manufacturerController.getManufacturerById,
);
manufacturerRouter.put(
  "/:id",
  validateDataMiddleware(manufacturersSchemas.updateManufacturerById),
  manufacturerController.updateManufacturerById,
);
manufacturerRouter.delete(
  "/:id",
  validateDataMiddleware(manufacturersSchemas.deleteManufacturerById),
  manufacturerController.deleteManufacturerById,
);

export default manufacturerRouter;
