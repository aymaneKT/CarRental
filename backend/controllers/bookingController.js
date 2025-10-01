import { Booking } from "../models/bookingSchema.js";
import { Car } from "../models/carSchema.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lt: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.query;

    const cars = await Car.find({ location, isAvailable: true });

    const AvailableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(AvailableCarsPromises);

    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.status(200).json({
      success: true,
      count: availableCars.length,
      cars: availableCars,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvaialble = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvaialble) {
      return res.status(404).json({
        success: false,
        message: "Car is not available",
      });
    }
    const carData = await Car.findById(car);
    if (id === carData.owner.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own car",
      });
    }
    const pickDate = new Date(pickupDate);
    const retDate = new Date(returnDate);
    const numOfDays = Math.ceil((retDate - pickDate) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * numOfDays;
    const booking = await Booking.create({
      car,
      owner: carData.owner.toString(),
      user: id,
      pickupDate,
      returnDate,
      price,
    });
    const newBooking = await Booking.findById(booking.id).populate("car");
    res.status(201).json({
      success: true,
      message: `Booking successful for ${carData.brand} ${carData.model}`,
      newBooking,
    });
  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const id = req.user.id;
    const bookings = await Booking.find({ user: id }).populate("car").sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const geOwnerBooking = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== "owner") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const bookings = await Booking.find({ owner: id })
      .populate("car")
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const changeBookingStatus = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (role !== "owner" || booking.owner.toString() !== id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const bookings = await Booking.findByIdAndUpdate(bookingId, {
      status: status,
    });
    return res.status(200).json({
      success: true,
      message: "Booking Updated : " + status,
      bookings,
    });
  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
