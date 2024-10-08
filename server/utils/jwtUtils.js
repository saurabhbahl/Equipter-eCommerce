import bcryptjs from "bcryptjs";
import { JWT_SECRET } from "../useENV.js";
import jwt from "jsonwebtoken";

export async function getSalt() {
  const salt = await bcryptjs.genSalt(12);
  return salt;
}

export async function matchPassword(entertedPassword, savedPassword) {
  const isMatch = await bcryptjs.compare(entertedPassword, savedPassword);
  return isMatch;
}
export async function hashPassword(password, salt) {
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

export async function generateToken(
  userData,
  jwtSecret = JWT_SECRET,
  expiry = "2h"
) {
  const token = await jwt.sign(userData, jwtSecret, { expiresIn: expiry });
  console.log("Token", token);
  return token;
}
