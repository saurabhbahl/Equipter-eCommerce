import dotenv from "dotenv";

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_ENC_ALGO = process.env.TOKEN_ENC_ALGO;
