import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import type { ICar } from "../../Interfaces/ICar";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function ManageCars() {
  const { currency, carsOwnwer, axios, setCarsOwnwer } = useAppContext();
  const [showDeleteModal, setDeleteShowModal] = useState<boolean>(false);
  const [idCarToDelete, setIdCarToDelete] = useState<string | null>();

  const toggleCarAvailability = (idCar: string) => {
    axios
      .patch(`/toggleCarAvailability/${idCar}`)
      .then((result) => {
        setCarsOwnwer(
          carsOwnwer.map((car: ICar) =>
            car._id === idCar ? { ...car, isAvailable: !car.isAvailable } : car
          )
        );
        toast.success(result.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to toggle car");
      });
  };

  return (
    <>
      {showDeleteModal && (
        <ConfirmationModal
          setDeleteShowModal={setDeleteShowModal}
          idCarToDelete={idCarToDelete}
          setIdCarToDelete={setIdCarToDelete}
        />
      )}
      <div className="px-4 pt-10 md:px-10 w-full">
        <Title
          title="Menage Cars"
          subtitle="View all listed cars , update their details, or remove them from the booking platform"
        />
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full table-auto border border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium max-md:hidden">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carsOwnwer.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No Cars found.
                  </td>
                </tr>
              ) : (
                carsOwnwer?.map((car) => (
                  <tr key={car._id} className="border-t border-borderColor">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={car.image}
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
                          car.isAvailable
                            ? "text-green-500 bg-green-100"
                            : "text-red-500 bg-red-100"
                        }`}
                      >
                        {car.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="p-3 flex items-center">
                      <img
                        onClick={() => toggleCarAvailability(car._id ?? "")}
                        loading="lazy"
                        className="cursor-pointer"
                        src={
                          car.isAvailable
                            ? assets.eye_close_icon
                            : assets.eye_icon
                        }
                      />
                      <img
                        loading="lazy"
                        className="cursor-pointer"
                        src={assets.delete_icon}
                        onClick={() => {
                          setIdCarToDelete(car._id);
                          setDeleteShowModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
