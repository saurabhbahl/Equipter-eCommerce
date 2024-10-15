import dotenv from "dotenv";

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_ENC_ALGO = process.env.TOKEN_ENC_ALGO;
export const MAILER_EMAIL = process.env.MAILER_EMAIL;
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD;
