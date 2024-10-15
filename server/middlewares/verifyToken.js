import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";
import { JWT_SECRET, TOKEN_ENC_ALGO } from "../useENV.js";

const publicKey = fs.readFileSync("./public.key", "utf8");
const privateKey = fs.readFileSync("./private.key", "utf8");

// Middleware to verify JWT token
export function verifyToken(req, res, next) {
  console.log("call");
  const authHeader=req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;
  console.log("Cookie",req.cookies.token)

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized Access!",
    });
  }

  try {
    // const tokenWithoutBearer = token.split(" ")[1];
    console.log("Token received:", token);
    
    const decryptedTokenBuffer = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: TOKEN_ENC_ALGO,
      },
      Buffer.from(token, "base64")
    );

    const decryptedToken = decryptedTokenBuffer.toString("utf8");

    // Verify the JWT token
    const decoded = jwt.verify(decryptedToken, JWT_SECRET  ,{
      algorithms: "HS256",
    });
    console.log("Decoded Payload:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
}



