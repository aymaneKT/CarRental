import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/DataBase.js";
import { userRouter } from "./routes/userRoutes.js";
import { carRouter } from "./routes/carRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
dotenv.config();
app.use(cors());
app.use("/cars", express.static("cars"));
//USER
app.use("", userRouter);
//car
app.use("", carRouter);
//booking
app.use("", bookingRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
