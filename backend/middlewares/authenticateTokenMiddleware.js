import jwt from "jsonwebtoken";

const authenticateToken = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Assumes "Bearer TOKEN"

  if (token == null)
    return res.status(401).json({ message: "Error no token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Error invalid token" });
    res.locals.user = decoded;
    next();
  });
};

export default authenticateToken;
