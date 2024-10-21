import userService from "../services/userService.js";
import createToken from "../utility/createToken.js";
import bcrypt from "bcrypt";

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
    return res.status(200).json({ token, username, role: user.role });
  } catch (err) {
    console.log("Error during user login: ", err);
    return res.status(500).json({ message: "Error during user login" });
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

export default {
  login,
  likeBeerById,
};
