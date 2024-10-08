import { JWT_SECRET } from "../useENV.js";
import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized Access!",
    });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
}
