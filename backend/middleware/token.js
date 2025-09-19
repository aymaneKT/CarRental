import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const option = {
  algorithm: "HS256",
  expiresIn: "3h",
};

export const generateToken = (id , role) => {
  const payload = { id , role };

  const token = jwt.sign(payload, process.env.SECRET_KEY, option);
  return token;
};

export const checkToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, option);
};