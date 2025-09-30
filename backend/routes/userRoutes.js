import express from "express";
import {
  changeRoleToOwner,
  getDashbordData,
  logIn,
  registerUser,
  updateUserImage,
  getUserData,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", logIn);
userRouter.put("/changeRole", auth, changeRoleToOwner);
userRouter.get("/dashboard", auth, getDashbordData);
userRouter.get("/userData", auth, getUserData);
userRouter.patch(
  "/update-profile",
  auth,
  upload.single("image"),
  updateUserImage
);
