import express from "express";
import beerController from "../controllers/beerController.js";
import beerSchemas from "../validationSchemas/beersSchemas.js";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";

const beerRouter = express.Router();

beerRouter.get("/", beerController.getAllBeers);
beerRouter.get(
  "/:id",
  validateDataMiddleware(beerSchemas.getBeerById),
  beerController.getBeerById,
);
beerRouter.put(
  "/:id",
  validateDataMiddleware(beerSchemas.updateBeerById),
  beerController.updateBeerById,
);
beerRouter.post(
  "/",
  validateDataMiddleware(beerSchemas.createBeer),
  beerController.createBeer,
);
beerRouter.delete(
  "/:id",
  validateDataMiddleware(beerSchemas.deleteBeerById),
  beerController.deleteBeerById,
);

export default beerRouter;
