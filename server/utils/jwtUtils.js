import bcryptjs from "bcryptjs";
import fs from "fs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_ENC_ALGO } from "../useENV.js";

const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

// Function to generate salt
export async function getSalt() {
  const salt = await bcryptjs.genSalt(12);
  return salt;
}

// Function to match passwords
export async function matchPassword(enteredPassword, savedPassword) {
  const isMatch = await bcryptjs.compare(enteredPassword, savedPassword);
  return isMatch;
}

// Function to hash passwords
export async function hashPassword(password, salt) {
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

// Function to generate JWT token
export async function generateToken(userData, expiry = "3h") {
  const token = jwt.sign(userData, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expiry,
  });
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: TOKEN_ENC_ALGO,
    },
    Buffer.from(token)
  );

  console.log("Encrypted Data: ", encryptedData.toString("base64"));
  return encryptedData.toString("base64");
  // return token
}
