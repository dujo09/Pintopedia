import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createToken = function (jwtPayload) {
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS,
  });

  console.log("Generated token: " + token);
  return token;
};

export default createToken;
