import { ObjectId } from "mongodb";
import Beer from "../models/Beer.js";

const getAllBeersDb = async function () {
  const beers = await Beer.find({});
  return beers;
};

const getBeerByIdDb = async function (id) {
  if (!ObjectId.isValid(id)) return null;

  const beer = await Beer.findOne({ _id: id });
  return beer;
};

const updateBeerByIdDb = async function (id, beerData) {
  if (!ObjectId.isValid(id)) return null;

  let beer = await Beer.findOne({ _id: id });
  Object.keys(beerData).forEach((key) => {
    beer[key] = beerData[key];
  });
  await beer.save();
  return beer;
};

const deleteBeerByIdDb = async function (id) {
  if (!ObjectId.isValid(id)) return null;

  const result = await Beer.deleteOne({ _id: id });
  return result.deletedCount;
};

export default { getAllBeersDb, getBeerByIdDb, updateBeerByIdDb, deleteBeerByIdDb };
