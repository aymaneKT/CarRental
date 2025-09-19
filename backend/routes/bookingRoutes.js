import express from "express";
import { auth } from "../middleware/auth.js";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getUserBooking,
  geOwnerBooking,
} from "../controllers/bookingController.js";

export const bookingRouter = express.Router();

bookingRouter.get("/checkAvailability", checkAvailabilityOfCar);
bookingRouter.post("/createBooking", auth, createBooking);
bookingRouter.get("/userBooking", auth, getUserBooking);
bookingRouter.get("/ownerBooking", auth, geOwnerBooking);
bookingRouter.patch("/changeStatusBooking", auth, changeBookingStatus);
