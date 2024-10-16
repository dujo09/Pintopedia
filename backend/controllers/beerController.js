import beerService from "../services/beerService.js";

const getAllBeers = async function (req, res) {
  try {
    const beers = await beerService.getAllBeersDb();
    return res.status(200).json(beers);
  } catch (err) {
    console.log("Error getting all beers: ", err);
    return res.status(500).json({ message: "Error getting beers" });
  }
};

const getBeerById = async function (req, res) {
  const id = req.params.id;
  console.log("id", id);
  try {
    const beer = await beerService.getBeerByIdDb(id);
    console.log("beer", beer)
    if (!beer) return res.status(404).json({ message: "Beer not found" });

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error getting beer: ", err);
    return res.status(500).json({ message: "Error getting beer" });
  }
};

const updateBeerById = async function (req, res) {
  const id = req.params.id;
  const beerData = req.body;
  try {
    const beer = await beerService.updateBeerByIdDb(id, beerData);
    if (!beer) return res.status(404).json({ message: "Beer not found" });

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error updating beer: ", err);
    return res.status(500).json({ message: "Error updating beer" });
  }
};

const createBeer = async function (req, res) {
  const beerData = req.body;
  try {
    const beer = await beerService.createBeerDb(beerData);
    // if (!beer) return res.status(404).json({ message: "Beer not found" });

    return res.status(200).json(beer);
  } catch (err) {
    console.log("Error creating beer: ", err);
    return res.status(500).json({ message: "Error creating beer" });
  }
};

const deleteBeerById = async function (req, res) {
  const id = req.params.id;
  try {
    const deletedCount = await beerService.deleteBeerByIdDb(id);
    if (!deletedCount) return res.status(404).json({ message: "Beer not found" });

    return res.status(200).json(deletedCount);
  } catch (err) {
    console.log("Error deleting beer: ", err);
    return res.status(500).json({ message: "Error deleting beer" });
  }
};

export default { getAllBeers, getBeerById, updateBeerById, createBeer, deleteBeerById };
