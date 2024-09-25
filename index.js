// import { Sequelize } from "sequelize";
// import express from "express";
// import { connectDb } from "./dbConnection.js";
// const app = express();
// connectDb()
// // const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/testing-sequelize')

// // const sequelize = new Sequelize("testing-sequelize", "postgres", "admin", {
// //   host: "localhost",
// //   dialect: "postgres",
// //   port: 5432,
// // });

// // try {
// //   await sequelize.authenticate();
// //   console.log("Connection has been established successfully.");
// // } catch (error) {
// //   console.error("Unable to connect to the database:", error);
// // }

// const PORT = 3000;
// app.listen(PORT, () => {
//   try {
//     console.log("Listning at port:", PORT);
//   } catch (error) {
//     console.log(error);
//   }
// });

import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";
import { sequelize } from "./dbConnection.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", router);

if (!process.env.SF_ACCESS_TOKEN || !process.env.PORT) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);  
}

app.post("/", async (req, res) => {
  try {
    let sfRes = await fetch(process.env.SF_ACCESS_TOKEN, {
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

app.all("/api/*",async(req,res)=>{
  try {
    
    return res.json({ success: false, data: 'Invalid Route' });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
})
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
