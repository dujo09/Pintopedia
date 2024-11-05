import { ObjectId } from "mongodb";
import Beer from "../models/Beer.js";

const getAllBeersForViewDb = async function (userId) {
  try {
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
            { $match: { _id: new ObjectId(userId) } },
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
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBeerByIdDb = async function (beerId, userId) {
  try {
    if (!ObjectId.isValid(beerId))
      throw new Error("beerId not valid ObjectId type");

    const beer = await Beer.aggregate([
      {
        $match: { _id: new ObjectId(beerId) },
      },
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
        $addFields: {
          userRating: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$userRatings",
                  as: "rating",
                  cond: { $eq: ["$$rating.userId", new ObjectId(userId)] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          userRating: { $ifNull: ["$userRating.rating", null] },
        },
      },
      {
        $project: { userRatings: 0 },
      },
    ]);

    return beer[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateBeerByIdDb = async function (beerId, beerData, userId) {
  const {
    name,
    alcoholPercentage,
    color,
    averagePrice,
    flavorDescription,
    manufacturer,
  } = beerData;

  try {
    if (!ObjectId.isValid(beerId))
      throw new Error("beerId not valid ObjectId type");

    const updatedBeer = await Beer.findOneAndUpdate(
      { _id: new ObjectId(beerId) },
      {
        $set: {
          name,
          alcoholPercentage,
          color,
          averagePrice,
          flavorDescription,
          manufacturer,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!updatedBeer) return null;

    const ratingData = await Beer.aggregate([
      {
        $match: { _id: new ObjectId(beerId) },
      },
      {
        $project: {
          averageRating: { $avg: "$userRatings.rating" },
          userRating: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$userRatings",
                  as: "rating",
                  cond: { $eq: ["$$rating.userId", new ObjectId(userId)] },
                },
              },
              0,
            ],
          },
        },
      },
    ]);

    const userRating =
      ratingData.length > 0 && ratingData[0].userRating
        ? ratingData[0].userRating.rating
        : null;
    const averageRating =
      ratingData.length > 0 ? ratingData[0].averageRating : null;

    updatedBeer.userRating = userRating;
    updatedBeer.averageRating = averageRating;
    delete updatedBeer.userRatings;

    return updatedBeer;
  } catch (error) {
    throw new Error(error.message);
  }
};

const rateBeerByIdDb = async function (beerId, userId, rating) {
  try {
    if (!ObjectId.isValid(beerId))
      throw new Error("beerId not valid ObjectId type");

    const beer = await Beer.findOne({ _id: beerId });
    if (!beer) return null;

    const existingRatingIndex = beer.userRatings.findIndex(
      (r) => r.userId.toString() === userId,
    );

    if (existingRatingIndex >= 0) {
      beer.userRatings[existingRatingIndex].rating = rating;
    } else {
      beer.userRatings.push({ userId: new ObjectId(userId), rating });
    }

    await beer.save();

    const averageRating =
      beer.userRatings.length > 0
        ? beer.userRatings.reduce((acc, r) => acc + r.rating, 0) /
          beer.userRatings.length
        : null;

    return {
      userRating: rating,
      averageRating,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const createBeerDb = async function (beerData) {
  const {
    name,
    alcoholPercentage,
    color,
    averagePrice,
    flavorDescription,
    manufacturer,
  } = beerData;

  try {
    const beer = await Beer.create({
      name,
      alcoholPercentage,
      color,
      averagePrice,
      flavorDescription,
      manufacturer,
    });
    return beer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteBeerByIdDb = async function (beerId) {
  try {
    if (!ObjectId.isValid(beerId))
      throw new Error("beerId not valid ObjectId type");

    const result = await Beer.deleteOne({ _id: beerId });
    return result.deletedCount;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getAllBeersForViewDb,
  getBeerByIdDb,
  updateBeerByIdDb,
  createBeerDb,
  deleteBeerByIdDb,
  rateBeerByIdDb,
};
