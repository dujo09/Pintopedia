import { ObjectId } from "mongodb";
import Beer from "../models/Beer.js";
import User from "../models/User.js";

const getAllBeersForViewDb = async function (userId) {
  const beers = await Beer.aggregate([
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: { $gt: [{ $size: "$userRatings" }, 0] },
            then: { $avg: "$userRatings.rating" },
            else: 0,
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        let: { beerId: "$_id" },
        pipeline: [
          { $match: { _id: userId } },
          { $project: { isLiked: { $in: ["$$beerId", "$likedBeers"] } } },
        ],
        as: "userLikedStatus",
      },
    },
    {
      $addFields: {
        isLiked: { $arrayElemAt: ["$userLikedStatus.isLiked", 0] },
      },
    },
    {
      $lookup: {
        from: "manufacturers",
        localField: "manufacturer",
        foreignField: "_id",
        as: "manufacturerDetails",
      },
    },
    {
      $addFields: {
        manufacturerName: { $arrayElemAt: ["$manufacturerDetails.name", 0] },
      },
    },
    {
      $project: {
        userRatings: 0,
        userLikedStatus: 0,
      },
    },
  ]);

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
