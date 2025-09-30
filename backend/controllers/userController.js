import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import { generateToken } from "../middleware/token.js";
import { Booking } from "../models/bookingSchema.js";
import { Car } from "../models/carSchema.js";
import { imagekit } from "../middleware/imageKit.js";
import fs from "fs";
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
export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ sucess: true, user });
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

export const getDashbordData = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role !== "owner") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cars = await Car.find({ owner: id });
    const bookings = await Booking.find({ owner: id })
      .populate("car")
      .sort({ createdAt: -1 });
    const pendingBooking = await Booking.find({ owner: id, status: "pending" });
    const completedBooking = await Booking.find({
      owner: id,
      status: "confirmed",
    });
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashBordData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBooking.length,
      completedBookings: completedBooking.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };
    return res.status(200).json({ success: true, dashBordData });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserImage = async (req, res) => {
  const { id } = req.user;
  const image = req.file;
  try {
    if (!image) {
      return res.status(400).json({ message: "Image is  required" });
    }

    const fileBuffer = fs.readFileSync(image.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: image.originalname,
      folder: "/users",
    });

    const imageURL = imagekit.url({
      path: response.filePath,
      transformation: [{ width: "1280", quality: "auto", format: "webp" }],
    });
    const user = await User.findByIdAndUpdate(id, {
      image: imageURL,
    });
    fs.unlinkSync(image.path);
    return res
      .status(201)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
