import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/dbConnection.js";
import cors from "cors";
import salesForceRouter from "./routes/salesForce.routes.js";
import { checkSFAccessToken } from "./middlewares/sFMiddlewares.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/sf", salesForceRouter);

app.post("/", async (req, res) => {
  try {
    let sfRes = await fetch(process.env.SF_ACCESS_TOKEN_URL, {
      method: "post",
    });
    sfRes = await sfRes.json();
    console.log(sfRes);
    return res.json({ success: true, data: sfRes });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

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

//sync database
sequelize
  .sync()
  .then((result) => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("listning to", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
