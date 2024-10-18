import userService from "../services/userService.js";
import createToken from "../utility/createToken.js";
import bcrypt from "bcrypt";

const login = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await userService.getUserByUsername(username);
    if (!user)
      return res
        .status(404)
        .json({ message: "Error user not found in database" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Error incorrect password" });

    const tokenPayload = {
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

export default {
  login,
};
