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
    !location
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const fileBuffer = fs.readFileSync(image.path);
    const response = await imagekit.upload({
      file: fileBuffer, //required
      fileName: image.originalname, //required
      folder: "/cars",
    });
    // For URL Generation, works for both images and videos
    var imageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "1280",
          quality: "auto",
          format: "webp",
        },
      ],
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
    return res.status(201).json({ message: "Car added successfully", newCar });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
