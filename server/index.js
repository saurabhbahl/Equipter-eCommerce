import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/dbConnection.cjs";

import salesForceRouter from "./routes/salesForce.routes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/auth.routes.js";
import { verifyToken } from "./middlewares/verifyToken.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/sf", salesForceRouter);
app.use("/api/v1/user", verifyToken, userRouter);
app.use("/api/v1/auth", authRouter);

app.all("/api/*", async (req, res) => {
  try {
    return res.json({ success: false, data: "Invalid Route" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

// global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error;
  res.status(status).json({ message: message });
});

connection.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:=>", err, err.stack);
  } else {
    console.log("connected to database successfully");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});
