import User from "../models/User.js";

const getUserByUsername = async function (username) {
  return await User.findOne({ username: username });
};

export default {
  getUserByUsername,
};
