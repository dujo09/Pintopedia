import express from "express";
import beerController from "../controllers/beerController.js";
import beerSchemas from "../validationSchemas/beersSchemas.js";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const beerRouter = express.Router();

beerRouter.get("/", authenticateToken, beerController.getAllBeers);
beerRouter.get(
  "/:id",
  authenticateToken,
  validateDataMiddleware(beerSchemas.getBeerById),
  beerController.getBeerById,
);
beerRouter.put(
  "/:id",
  authenticateToken,
  validateDataMiddleware(beerSchemas.updateBeerById),
  beerController.updateBeerById,
);
beerRouter.post(
  "/",
  authenticateToken,
  validateDataMiddleware(beerSchemas.createBeer),
  beerController.createBeer,
);
beerRouter.delete(
  "/:id",
  authenticateToken,
  validateDataMiddleware(beerSchemas.deleteBeerById),
  beerController.deleteBeerById,
);

export default beerRouter;
