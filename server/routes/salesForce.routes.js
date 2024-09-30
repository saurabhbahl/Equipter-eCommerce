import express from "express";
const salesForceRouter = express.Router();
import {  sFQuery } from "../controllers/salesForce.controllers.js";
import { checkSFAccessToken } from "../middlewares/sFMiddlewares.js";

salesForceRouter.post("/query",checkSFAccessToken ,sFQuery)




export default salesForceRouter;
