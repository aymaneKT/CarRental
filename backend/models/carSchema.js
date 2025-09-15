import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    seating_capacity: {
      type: String,
      required: true,
    },
    fuel_type: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Car = mongoose.model("car", carSchema);
