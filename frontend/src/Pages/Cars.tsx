import { useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";

export default function Cars() {
  const [input, setInput] = useState<string>("");
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
        <p>Showing {dummyCarData.length} Cars</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyCarData.map((car, index) => (
            <CarCard car={car} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
