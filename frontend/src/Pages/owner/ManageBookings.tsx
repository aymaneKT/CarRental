import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import type { IBooking } from "../../Interfaces/IBooking";
import { assets, dummyMyBookingsData } from "../../assets/assets";

export default function ManageBookings() {
  const [bookings, setBookings] = useState<IBooking[]>();
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };
  useEffect(() => {
    fetchOwnerBookings();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Menage Bookings"
        subtitle="View all customer bookings , approve or cancel requests , and menage booking statues"
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full table-auto border border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payement</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking._id} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car?.image}
                    alt="Image"
                    className="h-12 w-12 aspect-square rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="max-md:hidden">
                    <p>
                      {car.brand}
                      {car.model}
                    </p>
                    <p>
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {" "}
                  {car.pricePerDay}
                  {currency}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      car.isAvaliable
                        ? "text-green-500 bg-green-100"
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3 flex items-center">
                  <img
                    loading="lazy"
                    className="cursor-pointer"
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                  />
                  <img
                    loading="lazy"
                    className="cursor-pointer"
                    src={assets.delete_icon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
