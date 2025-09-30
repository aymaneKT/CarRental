import React, { useState } from "react";
import type { ICar } from "../../Interfaces/ICar";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function AddCar() {
  const { axios, currency, setDashboard, setCarsOwnwer, carsOwnwer } =
    useAppContext();
  const [image, setImage] = useState<File | Blob | null>();
  const [car, setCar] = useState<ICar>({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
    isAvailable: false,
  });
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year.toString());
    formData.append("pricePerDay", car.pricePerDay.toString());
    formData.append("category", car.category);
    formData.append("transmission", car.transmission);
    formData.append("fuel_type", car.fuel_type);
    formData.append("seating_capacity", car.seating_capacity.toString());
    formData.append("location", car.location);
    formData.append("description", car.description);
    if (image) {
      formData.append("image", image);
    }
    axios
      .post("/addCar", formData)
      .then((result) => {
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
        setImage(null);
        setDashboard((prev) => ({
          ...prev,
          totalCars: (prev.totalCars ?? 0) + 1,
        }));
        setCarsOwnwer([...carsOwnwer, result.data.newCar]);
        toast.success(result.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Failed to add car");
      });
  };
  const handleChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setCar({ ...car, [e.target.name]: e.target.value });
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subtitle="Fill in details to list a new car for booking , including pricing , availiability , and car specifications."
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              loading="lazy"
              className="h-14 rounded cursor-pointer object-cover"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              id="car-image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0])
                  setImage(e.target.files[0]);
              }}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* car brand and modal */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="Brand">Brand</label>
            <input
              id="Brand"
              type="text"
              placeholder="e.g. BMW , Mercedes , Audi ...."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={handleChanges}
              name="brand"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="Model">Model</label>
            <input
              id="Model"
              type="text"
              placeholder="e.g. X5 , E-Class , M4 ...."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={handleChanges}
              name="model"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3">
          <div className="flex flex-col w-full">
            <label htmlFor="Year">Year</label>
            <input
              id="Year"
              type="number"
              placeholder="2025"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              onChange={handleChanges}
              name="year"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="daily-price">Price Daily ({currency})</label>
            <input
              id="daily-price"
              type="number"
              placeholder="100"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              onChange={handleChanges}
              name="pricePerDay"
              required
              max={new Date().getFullYear()}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChanges}
              required
              className="px-2 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.category}
            >
              <option value="">Select a category</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3">
          <div className="flex flex-col w-full">
            <label htmlFor="transmission">Transmission</label>
            <select
              name="transmission"
              id="transmission"
              onChange={handleChanges}
              required
              className="px-2 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.transmission}
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="fuel_type">Fuel Type</label>
            <select
              name="fuel_type"
              id="fuel_type"
              onChange={handleChanges}
              required
              className="px-2 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.fuel_type}
            >
              <option value="">Select a Fuel Type</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="seating_capacity">Seat Capacity</label>
            <input
              id="seating_capacity"
              type="number"
              placeholder="5"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              onChange={handleChanges}
              name="seating_capacity"
              required
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="location">Location</label>
          <select
            name="location"
            id="location"
            onChange={handleChanges}
            required
            className="px-2 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.location}
          >
            <option value="">Select a Location</option>
            {cityList.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChanges}
            placeholder="e.g A luxurios SUV with a spacious interios and powerful engine."
            required
            className="px-2 py-2 mt-1 border border-borderColor rounded-md outline-none resize-none"
            value={car.description}
            rows={5}
          ></textarea>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-primary-dull  mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} loading="lazy" />
          List Your Car
        </button>
      </form>
    </div>
  );
}
