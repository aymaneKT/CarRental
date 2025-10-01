import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

type ConfirmationModalType = {
  setDeleteShowModal: (value: boolean) => void;
  setIdCarToDelete: (idCar: string | null) => void;
  idCarToDelete?: string | null;
};
export default function ConfirmationModal({
  setDeleteShowModal,
  setIdCarToDelete,
  idCarToDelete,
}: ConfirmationModalType) {
  const { axios, setCarsOwnwer, carsOwnwer, setDashboard } = useAppContext();
  const deleteCar = () => {
    axios
      .patch(`/deleteCar/${idCarToDelete}`)
      .then((result) => {
        setCarsOwnwer(carsOwnwer.filter((car) => car._id !== idCarToDelete));
        setIdCarToDelete(null);
        setDeleteShowModal(false);
        toast.success(result.data.message);
        setDashboard((prev) => ({
          ...prev,
          totalCars: (prev.totalCars ?? 0)  - 1,
        }));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Failed to delete car");
      });
  };
  return (
    <div
      onClick={() => setDeleteShowModal(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200"
      >
        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
              stroke="#DC2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-gray-900 font-semibold mt-4 text-xl">
          Are you sure?
        </h2>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Do you really want to continue? This action
          <br />
          cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={() => setDeleteShowModal(false)}
            type="button"
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            onClick={deleteCar}
            type="button"
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
