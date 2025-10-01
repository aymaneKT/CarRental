import  { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export default function Hero() {
  const [location, setLocation] = useState<string>();
  const {pickUpDate , setPickUpDate , returnDate , setReturnDate , navigate} = useAppContext()
  const handleSearch = (e : any) => {
    e.preventDefault();
    navigate(`/cars?location=${location}&pickUpDate=${pickUpDate}&returnDate=${returnDate}`)
  };
  return (
    <div
      className="h-screen w-screen flex  flex-col items-center justify-center gap-14 max-sm:pt-10
    bg-light text-center"
    >
      <h1 className="text-4xl md:text-5xl mt-10 font-semibold">
        Luxury cars on rent
      </h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white  shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              className="outline-none"
              name="location"
              onChange={(e)=>setLocation(e.target.value)}
              value={location}
            >
              <option>Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">Please select location</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickupDate">Pick-up Date</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              min={new Date().toDateString().split("T")[0]}
              className="text-sm text-gray-500 outline-none"
              required
              onChange={(e)=>setPickUpDate(e.target.value)}
              value={pickUpDate}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="returnDate">Return date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              className="text-sm text-gray-500 outline-none"
              required
              onChange={(e)=>setReturnDate(e.target.value)}
              value={returnDate}
            />
          </div>
          <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-150"
              loading="lazy"
            />
            Search
          </button>
        </div>
      </form>
      <img
        src={assets.main_car}
        alt="car"
        className="max-h-74"
        loading="lazy"
      />
    </div>
  );
}
