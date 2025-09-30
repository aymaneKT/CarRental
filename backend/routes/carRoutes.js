import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addCar,
  deleteCar,
  getOwnerCar,
  toggleCarAvailability,
  getAllCars
} from "../controllers/carController.js";
import { upload } from "../middleware/multer.js";

export const carRouter = express.Router();

carRouter.get("/cars" , getAllCars)
carRouter.post("/addCar", auth, upload.single("image"), addCar);
carRouter.get("/getCarForOwner", auth, getOwnerCar);
carRouter.patch("/toggleCarAvailability/:carId", auth, toggleCarAvailability);
carRouter.patch("/deleteCar/:carId", auth, deleteCar);
 