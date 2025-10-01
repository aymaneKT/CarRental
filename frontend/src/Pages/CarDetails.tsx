import { useNavigate, useParams } from "react-router-dom";
import type { ICar } from "../Interfaces/ICar";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<ICar>();
  const {
    cars,
    currency,
    axios,
    setPickUpDate,
    pickUpDate,
    setReturnDate,
    returnDate,
    setUserBookings,
    userBookings,
  } = useAppContext();
  useEffect(() => {
    setCar(cars.find((car: ICar) => car._id === id));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/createBooking`, {
        car: id,
        pickupDate: pickUpDate,
        returnDate,
      })
      .then((result) => {
        toast.success(result.data.message);
        setUserBookings([...userBookings, result.data.newBooking]);
        setPickUpDate("");
        setReturnDate("");
        console.log(result)
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message ||
            "Failed to book the car. Please try again later."
        );
      });
  };

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        {" "}
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt="Car"
            className="w-full h-auto md:max-h-100 object-cover object-center  rounded-xl mb-6 shadow-md"
            loading="lazy"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-blod">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} - {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm-grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: `${car.fuel_type}`,
                },
                {
                  icon: assets.carIcon,
                  text: `${car.transmission}`,
                },
                {
                  icon: assets.location_icon,
                  text: `${car.location}`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="mb-2 h-5"
                    loading="lazy"
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            {/* desc */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            {/* features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View",
                  "Mirror",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* la parte destra del form  */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 "
        >
          <p className="flex items-center  justify-between text-2xl text-gray-800">
            {currency}
            {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">
              {" "}
              per day
            </span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              required
              onChange={(e) => setPickUpDate(e.target.value)}
              value={pickUpDate}
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              id="return-date"
              min={new Date().toISOString().split("T")[0]}
              required
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
            />
          </div>
          <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer">
            Book Now
          </button>
          <p className="text-center font-normal">
            No credit card required to reserve!
          </p>
        </form>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
