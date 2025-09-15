import express from "express";
import {
  changeRoleToOwner,
  logIn,
  registerUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", logIn);
userRouter.put("/changeRole", auth, changeRoleToOwner);
