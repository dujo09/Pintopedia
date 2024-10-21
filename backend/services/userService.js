import { ObjectId } from "mongodb";
import User from "../models/User.js";

const getUserByUsernameDb = async function (username) {
  return await User.findOne({ username: username });
};

const likeBeerByIdDb = async function (userId, beerId, isLiked) {
  try {
    if (!ObjectId.isValid(beerId)) throw new Error("Invalid id format");

    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not found");

    if (isLiked) {
      user.likedBeers.push(beerId);
    } else {
      user.likedBeers = user.likedBeers.filter(
        (id) => id.toString() !== beerId,
      );
    }

    await user.save();

    // return user.likedBeers.some(id => id.equals(beerId));
    return isLiked;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getUserByUsernameDb,
  likeBeerByIdDb,
};
