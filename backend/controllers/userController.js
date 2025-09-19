import bcrypt from "bcrypt";

import { User } from "../models/userSchema.js";
import { generateToken } from "../middleware/token.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ succes: false, message: "All fields are required" });
    }
    if (password.length < 8)
      return res.status(404).json({
        succes: false,
        message: "Password must be longer than 8 characters",
      });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(404).json({
        succes: false,
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id, user.role);

    return res
      .status(201)
      .json({ message: "User registred successfully", token, user });
  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required !" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const token = generateToken(user._id, user.role);
      return res.status(200).json({ message: "Login successful", token, user });
    }
    return res.status(404).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const changeRoleToOwner = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      role: "owner",
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "Role updated successfully", user });
  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
