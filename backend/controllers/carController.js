import fs from "fs";
import { imagekit } from "../middleware/imageKit.js";
import { Car } from "../models/carSchema.js";
export const addCar = async (req, res) => {
  const userId = req.user.id;
  const {
    brand,
    model,
    year,
    seating_capacity,
    fuel_type,
    transmission,
    pricePerDay,
    location,
  } = req.body;

  const image = req.file;

  if (
    !brand ||
    !model ||
    !year ||
    !seating_capacity ||
    !fuel_type ||
    !transmission ||
    !pricePerDay ||
    !location ||
    !image
  ) {
    if (image) fs.unlinkSync(image.path);
    return res
      .status(400)
      .json({ message: "All fields are required, including image" });
  }

  try {
    const fileBuffer = fs.readFileSync(image.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: image.originalname,
      folder: "/cars",
    });

    const imageURL = imagekit.url({
      path: response.filePath,
      transformation: [{ width: "1280", quality: "auto", format: "webp" }],
    });

    const newCar = await Car.create({
      owner: userId,
      brand,
      model,
      image: imageURL,
      year,
      seating_capacity,
      fuel_type,
      transmission,
      pricePerDay,
      location,
    });
    fs.unlinkSync(image.path);

    return res.status(201).json({ message: "Car added successfully", newCar });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getOwnerCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const cars = await Car.find({ owner: userId });

    return res.status(200).json({
      succes: true,
      cars,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const toggleCarAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const carId = req.params.carId;

    const car = await Car.findById(carId);

    if (car.owner.toString() !== userId) {
      return res.status(401).json({ succes: false, message: "Unauthorized" });
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    return res
      .status(200)
      .json({ succes: true, message: "Availibilty Toggled", car });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// remove car >> just removing the ownwer and update the availability --> keep in the history of users

export const deleteCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const carId = req.params.carId;

    const car = await Car.findById(carId);
    if (car.owner !== userId) {
      return res.status(401).json({ succes: false, message: "Unauthorized" });
    }
    car.isAvailable = false;
    car.owner = null;
    await car.save();
    return res.status(200).json({ succes: true, message: "Car Removed" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
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
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
