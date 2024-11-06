import { ObjectId } from "mongodb";
import User from "../models/User.js";

const getUserByIdDb = async function (userId) {
  try {
    if (!ObjectId.isValid(userId))
      throw new Error("userId not valid ObjectId type");

    const user = await User.findOne({ _id: userId });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUserByIdDb = async function (userId, userData) {
  const { username, firstName, lastName, email, country } = userData;

  try {
    if (!ObjectId.isValid(userId))
      throw new Error("userId not valid ObjectId type");

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          username,
          firstName,
          lastName,
          email,
          country,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!updatedUser) return null;

    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createUserDb = async function (userData) {
  const { username, passwordHash, role } =
    userData;

  try {
    const user = await User.create({
      username, passwordHash, role    });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

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
  getUserByIdDb,
  getUserByUsernameDb,
  likeBeerByIdDb,
  updateUserByIdDb,
  createUserDb
};
