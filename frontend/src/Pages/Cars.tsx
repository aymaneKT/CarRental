import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import type { ICar } from "../Interfaces/ICar";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Cars() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const pickUpDate = searchParams.get("pickUpDate");
  const returnDate = searchParams.get("returnDate");
  const { cars, axios } = useAppContext();
  const isSearchData = pickUpDate && location && returnDate;
  const [filteredCars, setFiltredCar] = useState<ICar[]>();
  const [input, setInput] = useState<string>("");
  const searchCarAvailability = () => {
    axios
      .get("/checkAvailability", {
        params: {
          location,
          pickUpDate,
          returnDate,
        },
      })
      .then((result) => {
        console.log(result);
        setFiltredCar(result.data.cars);
        if (result.data.cars.length === 0) toast("No cars available");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const applyFilter = () => {
    if (input === "" || input.length === 0) {
      setFiltredCar(cars);
      return;
    }

    const filterCars = filteredCars?.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase()) ||
        car.fuel_type.toLowerCase().includes(input.toLowerCase()) ||
        car.location.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFiltredCar(filterCars);
  };
  useEffect(() => {
    isSearchData && searchCarAvailability() && applyFilter();
  }, []);
  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Avaialble Cars"
          subtitle="Browse our selection of premium vehicules available for your next adventure"
        />
        <div className="flex items-center  bg-white px-4 max-w-140 mt-6 w-full h-12 rounded-full">
          <img
            src={assets.search_icon}
            alt=""
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
          />
          <input
            type="text"
            className="w-full h-full outline-none text-gray-500"
            placeholder="Search by mark , model or features"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <img
            src={assets.filter_icon}
            alt=""
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
          />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p>Showing {filteredCars?.length || 0} Cars</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars?.map((car: ICar, index: number) => (
            <CarCard car={car} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
