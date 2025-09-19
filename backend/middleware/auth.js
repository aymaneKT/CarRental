import dotenv from "dotenv";
dotenv.config();
import { checkToken } from "./token.js";
export const auth = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access Denied",
    });
  }
  try {
    const token = header.split(" ")[1];
    const user = checkToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
