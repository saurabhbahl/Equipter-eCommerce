// schema: [
//     './schema1.js',
//     './schema2.js'
//   ],
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  schema: "models/userModel.js",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  dialect: "postgresql",
});
