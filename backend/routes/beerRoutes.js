import express from "express";
import beerController from "../controllers/beerController.js";
import beerSchemas from "../validationSchemas/beersSchemas.js";
import validateDataMiddleware from "../middlewares/validateDataMiddleware.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const beerRouter = express.Router();

beerRouter.get("/", authenticateToken, beerController.getAllBeersForView);
beerRouter.get(
  "/:beerId",
  authenticateToken,
  validateDataMiddleware(beerSchemas.getBeerById),
  beerController.getBeerById,
);
beerRouter.put(
  "/:beerId",
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
  "/:beerId",
  authenticateToken,
  validateDataMiddleware(beerSchemas.deleteBeerById),
  beerController.deleteBeerById,
);
beerRouter.put(
  "/rate/:beerId",
  authenticateToken,
  validateDataMiddleware(beerSchemas.rateBeerById),
  beerController.rateBeerById,
);

export default beerRouter;
