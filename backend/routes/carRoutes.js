import express from "express";
import { auth } from "../middleware/auth.js";
import { addCar } from "../controllers/carController.js";
import { upload } from "../middleware/multer.js";

export const carRouter = express.Router();

carRouter.post("/addCar", auth, upload.single("image"), addCar);
