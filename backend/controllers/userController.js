import userService from "../services/userService.js";
import createToken from "../utility/createToken.js";
import bcrypt from "bcrypt";

const getAllUsers = async function (req, res) {
  const userRole = res.locals.user.role;
  
  try {
    if (userRole !== "admin")
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });
    
    const users = await userService.getAllUsersDb();
    return res.status(200).json(users);
  } catch (err) {
    console.log("Error getting all Users: ", err);
    return res.status(500).json({ message: "Error getting all Users" });
  }
};

const getUserById = async function (req, res) {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserByIdDb(userId);
    if (!user) return res.status(404).json({ message: "Error User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.log("Error getting User: ", err.message);
    return res.status(500).json({ message: "Error getting User" });
  }
};

const updateUserById = async function (req, res) {
  const userId = req.params.userId;
  const userData = req.body;
  const userIdFromToken = res.locals.user.id;
  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin"  && userIdFromToken !== userId)
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });
    
    const user = await userService.updateUserByIdDb(userId, userData);
    if (!user) return res.status(404).json({ message: "Error User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.log("Error updating User: ", err.message);
    return res.status(500).json({ message: "Error updating User" });
  }
};

const login = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await userService.getUserByUsernameDb(username);
    if (!user)
      return res
        .status(404)
        .json({ message: "Error user not found in database" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Error incorrect password" });

    const tokenPayload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = createToken(tokenPayload);
    return res
      .status(200)
      .json({ token, username, role: user.role, id: user._id });
  } catch (err) {
    console.log("Error during user login: ", err);
    return res.status(500).json({ message: "Error during user login" });
  }
};

const register = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await userService.getUserByUsernameDb(username);
    if (user)
      return res
        .status(409)
        .json({ message: "Error user already defined in database" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await userService.createUserDb({
      username,
      passwordHash,
      role: "user",
    });

    const tokenPayload = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    };
    const token = createToken(tokenPayload);

    return res
      .status(200)
      .json({ token, username, role: newUser.role, id: newUser._id });
  } catch (err) {
    console.log("Error during user registration: ", err);
    return res.status(500).json({ message: "Error during user registration" });
  }
};

const likeBeerById = async function (req, res) {
  const userId = res.locals.user.id;
  const beerId = req.params.id;
  const isLiked = req.body.isLiked;
  try {
    const isLikedDb = await userService.likeBeerByIdDb(userId, beerId, isLiked);
    return res.status(200).json({ isLikedDb });
  } catch (err) {
    console.log("Error during like beer by id: ", err);
    return res.status(500).json({ message: "Error during like beer by id" });
  }
};

const updateUserPasswordById = async function (req, res) {
  const userId = req.params.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  const userRole = res.locals.user.role;
  try {
    if (userRole !== "admin"  && userIdFromToken !== userId)
      return res
        .status(403)
        .json({ message: "Error User doesn't have permission" });
    
    const user = await userService.getUserByIdDb(userId);
    if (!user) return res.status(404).json({ message: "Error User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(403).json({ message: "Error incorrect password" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const updatedUser = userService.updateUserPasswordByIdDb(userId, passwordHash);
    if (!updatedUser) return res.status(500).json({ message: "Error updating User password" });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error updating User password: ", err.message);
    return res.status(500).json({ message: "Error updating User password" });
  }
};

export default {
  getUserById,
  login,
  register,
  likeBeerById,
  updateUserById,
  getAllUsers,
  updateUserPasswordById
};
