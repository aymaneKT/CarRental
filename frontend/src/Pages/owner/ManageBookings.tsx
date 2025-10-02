import toast from "react-hot-toast";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import type { IBooking } from "../../Interfaces/IBooking";

export default function ManageBookings() {
  const {
    ownerBookings,
    setOwnerBookings,
    currency,
    axios,
    dashboard,
    setDashboard,
  } = useAppContext();
  const changeBookingStatus = (idBooking: string, status: string): void => {
    axios
      .patch(`/changeStatusBooking`, {
        bookingId: idBooking,
        status,
      })
      .then((result) => {
        setOwnerBookings(
          ownerBookings.map((booking: IBooking) =>
            booking._id === idBooking ? { ...booking, status } : booking
          )
        );
        setDashboard((prev) => ({
          ...prev,
          recentBookings: prev.recentBookings?.map((booking) =>
            booking._id === idBooking ? { ...booking, status } : booking
          ),
        }));
        setDashboard((prev) => ({
          ...prev,
          pendingBookings: (prev.pendingBookings ?? 0) - 1,
        }));
        setDashboard((prev) => ({
          ...prev,
          completedBookings:
            status === "confirmed"
              ? (prev.completedBookings ?? 0) + 1
              : prev.completedBookings,
        }));
        setDashboard((prev) => ({
          ...prev,
          monthlyRevenue:
            status === "confirmed"
              ? (prev.monthlyRevenue ?? 0) +
                (ownerBookings.find((b) => b._id === idBooking)?.price ?? 0)
              : prev.monthlyRevenue,
        }));
        toast.success(result.data.message);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message || "Failed to change booking status"
        );
      });
  };

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
              <th className="p-3 font-medium">Booking</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payement</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ownerBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No bookings found.
                </td>
              </tr>
            ) : (
              ownerBookings?.map((booking) => (
                <tr key={booking._id} className="border-t border-borderColor">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking.car?.image}
                      alt="Image"
                      className="h-12 w-12 aspect-square rounded-lg object-cover"
                      loading="lazy"
                    />
                    <p className="max-md:hidden font-medium">
                      {booking.car?.brand} - {booking.car?.model}
                    </p>
                  </td>
                  <td className="p-3 max-md:hidden">
                    {booking.pickupDate?.split("T")[0]} To{" "}
                    {booking.returnDate?.split("T")[0]}
                  </td>
                  <td className="p-3">
                    {booking.price}
                    {currency}
                  </td>
                  <td className="p-3 max-md:hidden">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      Offline
                    </span>
                  </td>

                  <td className="p-3">
                    {booking.status === "pending" ? (
                      <select
                        onChange={(e) =>
                          changeBookingStatus(booking._id || "", e.target.value)
                        }
                        className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-ms outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "text-green-500 bg-green-100"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
