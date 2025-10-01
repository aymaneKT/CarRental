import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";

export default function MyBooking() {
  const { userBookings, currency } = useAppContext();
  console.log(userBookings);
  return (
    <div className=" md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl ">
      <Title
        title="My Bookings"
        subtitle="View and Menage your all car bookings"
        align="left"
      />
      <div>
        {userBookings.length === 0 ? (
          <h1  className="p-6  text-gray-400">
            No bookings found.
          </h1>
        ) : (
          userBookings?.map((booking, index) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-l-lg mt-6 first:mt-12"
            >
              {/* immagine + info */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking.car?.image}
                    alt={booking.car?.brand + "-" + booking.car?.model}
                    loading="lazy"
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <p className="text-lg font-medium mt-2">
                  {booking?.car?.brand + "-" + booking?.car?.model}
                </p>
                <p className="text-gray-500">
                  {booking?.car?.year} - {booking.car?.category} -{" "}
                  {booking?.car?.location}
                </p>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1 bg-light rounded">
                    Booking #{index + 1}
                  </p>
                  <p
                    className={`px-3 p-1 text-xs rounded-full ${
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
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    loading="lazy"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {booking.pickupDate?.split("T")[0]} To{" "}
                      {booking.returnDate?.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.location_icon_colored}
                    alt=""
                    loading="lazy"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Pick-up location</p>
                    <p>{booking.car?.location}</p>
                  </div>
                </div>
              </div>

              <div className="md-col-span-1 flex felx-col justify-between gap-6">
                <div className="text-sm text-gray-500 text-right">
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {currency}
                    {booking.price}
                  </h1>
                  <p>Booked on {booking.createdAt?.split("T")[0]}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
