import beerService from "../services/beerService.js";

const getAllBeersForView = async function (req, res) {
  const userId = res.locals.user.id;
  try {
    const beers = await beerService.getAllBeersForViewDb(userId);
    return res.status(200).json(beers);
  } catch (err) {
    console.log("Error getting all beers: ", err.message);
    return res.status(500).json({ message: "Error getting all beers" });
  }
};

const getBeerById = async function (req, res) {
  const beerId = req.params.beerId;
  const userId = res.locals.user.id;
  try {
    const beer = await beerService.getBeerByIdDb(beerId, userId);
    if (!beer) return res.status(404).json({ message: "Error Beer not found" });

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error getting beer: ", err.message);
    return res.status(500).json({ message: "Error getting beer" });
  }
};

const updateBeerById = async function (req, res) {
  const beerId = req.params.beerId;
  const beerData = req.body;
  const userId = res.locals.user.id;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const beer = await beerService.updateBeerByIdDb(beerId, beerData, userId);
    if (!beer) return res.status(404).json({ message: "Error Beer not found" });

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error updating beer: ", err.message);
    return res.status(500).json({ message: "Error updating beer" });
  }
};

const rateBeerById = async function (req, res) {
  const beerId = req.params.beerId;
  const rating = req.body.rating;
  const userId = res.locals.user.id;
  try {
    const ratings = await beerService.rateBeerByIdDb(beerId, userId, rating);
    if (!ratings)
      return res.status(404).json({ message: "Error Beer not found" });

    return res.status(200).json(ratings);
  } catch (err) {
    console.log("Error rating beer: " + err.message);
    return res.status(500).json({ message: "Error rating beer" });
  }
};

const createBeer = async function (req, res) {
  const beerData = req.body;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const beer = await beerService.createBeerDb(beerData);

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error creating beer: ", err.message);
    return res.status(500).json({ message: "Error creating beer" });
  }
};

const deleteBeerById = async function (req, res) {
  const beerId = req.params.beerId;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });

    const deletedCount = await beerService.deleteBeerByIdDb(beerId);
    if (!deletedCount)
      return res.status(404).json({ message: "Error Beer not found" });

    return res.status(200).json(deletedCount);
  } catch (err) {
    console.log("Error deleting beer: ", err.message);
    return res.status(500).json({ message: "Error deleting beer" });
  }
};

export default {
  getAllBeersForView,
  getBeerById,
  updateBeerById,
  createBeer,
  deleteBeerById,
  rateBeerById,
};
