import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import type { IDashboard } from "../../Interfaces/IDashboard";
import Title from "../../components/owner/Title";

export default function Dashboard() {
  const [data, setData] = useState<IDashboard>({
    totalCars: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
    totalBookings: 0,
  });
  const dashbordCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];
  const currency = import.meta.env.VITE_CURRENCY;
  useEffect(() => {
    setData(dummyDashboardData);
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10  ">
      <Title
        title="Admin Dashbord"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue ,and recent activities"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashbordCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* pren recenti */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-semibold">Recent Bookings</h1>
          <p className="text-sm text-gray-500">Latest customer bookings </p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <p>
                    {booking.car?.brand} - {booking.car?.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2  font-medium">
                <p className="text-sm text-gray-500">
                  {currency}
                  {booking.price}
                </p>
                <p
                  className={`px-3 py-0.5  text-sm rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-400/15 text-green-600"
                      : booking.status === "pending"
                      ? "bg-amber-500/40 text-amber-600"
                      : "bg-red-400/15 text-red-600"
                  }`}
                >
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* revenue  */}
        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl text-primary font-semibold">
            {currency}
            {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
}
