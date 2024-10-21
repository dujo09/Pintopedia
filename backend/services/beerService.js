import { ObjectId } from "mongodb";
import Beer from "../models/Beer.js";
import User from "../models/User.js";

const getAllBeersForViewDb = async function (userId) {
  const beers = await Beer.find({}).populate("manufacturer").lean();
  const user = await User.findOne({ _id: userId }).lean();

  const beersWithLikeStatus = beers.map((beer) => {
    beer.isLiked =
      user?.likedBeers && user.likedBeers.some(id => id.equals(beer._id));
    return beer;
  });

  console.log(user.likedBeers);
  console.log(beersWithLikeStatus.filter((item) => item.isLiked));

  return beersWithLikeStatus;
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

const createBeerDb = async function (beerData) {
  const beer = await Beer.create(beerData);
  return beer;
};

const deleteBeerByIdDb = async function (id) {
  if (!ObjectId.isValid(id)) return null;

  const result = await Beer.deleteOne({ _id: id });
  return result.deletedCount;
};

export default {
  getAllBeersForViewDb,
  getBeerByIdDb,
  updateBeerByIdDb,
  createBeerDb,
  deleteBeerByIdDb,
};
