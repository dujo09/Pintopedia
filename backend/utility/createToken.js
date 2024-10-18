import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createToken = function (jwtPayload) {
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS,
  });
};

export default createToken;
