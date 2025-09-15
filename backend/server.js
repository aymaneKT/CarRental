import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { connectDB } from "./config/DataBase.js";
import { userRouter } from "./routes/userRoutes.js";
import { carRouter } from "./routes/carRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
//USER
app.use("", userRouter);
//car
app.use("", carRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
