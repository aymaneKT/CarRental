import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { connectDB } from "./config/DataBase.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
