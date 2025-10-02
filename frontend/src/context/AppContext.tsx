import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { ICar } from "../Interfaces/ICar";
import type { IUser } from "../Interfaces/IUser";
import type { IContext } from "../Interfaces/IContext";
import type { IDashboard } from "../Interfaces/IDashboard";
import type { IBooking } from "../Interfaces/IBooking";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext<IContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [pickUpDate, setPickUpDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [cars, setCars] = useState<ICar[]>([]);
  const [dashboard, setDashboard] = useState<IDashboard>({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });
  const [carsOwnwer, setCarsOwnwer] = useState<ICar[]>([]);
  const [ownerBookings, setOwnerBookings] = useState<IBooking[]>([]);
  const [userBookings, setUserBookings] = useState<IBooking[]>([]);
  const fetchUser = async () => {
    axios
      .get("/userData")
      .then((result) => {
        setUser(result.data.user);
        setIsOwner(result.data.user.role === "owner");
      })
      .catch((error) => {
        navigate("/");
        toast.error(error.response.data.error || "Failed to fetch user");
      });
  };
  const fetchDashboardData = () => {
    axios
      .get("/dashboard")
      .then((result) => {
        setDashboard(result.data.dashBordData || {});
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to fetch dashboard");
      });
  };
  const fetchAllCars = async () => {
    axios
      .get("/cars")
      .then((result) => {
        setCars(result.data.cars ?? []);
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to fetch cars");
      });
  };
  const fetchUserBookings = async () => {
    axios
      .get("/userBooking")
      .then((result) => {
        setUserBookings(result.data.bookings ?? []);
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to fetch cars");
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsOwner(false);
    setUser(null);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
    navigate("/");
  };

  const fetchOwnerCars = () => {
    axios
      .get("/getCarForOwner")
      .then((result) => {
        setCarsOwnwer(result.data.cars ?? []);
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to fetch cars");
      });
  };
  const fetchOwnerBookings = () => {
    axios
      .get("/ownerBooking")
      .then((result) => {
        setOwnerBookings(result.data.bookings ?? []);
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Failed to fetch Bookings");
      });
  };

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
    fetchAllCars();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      fetchUser();
      fetchUserBookings();
    }
  }, [token]);
  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
      fetchOwnerCars();
      fetchOwnerBookings();
    }
  }, [isOwner]);
  const value: IContext = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logOut,
    fetchAllCars,
    cars,
    setCars,
    pickUpDate,
    setPickUpDate,
    returnDate,
    setReturnDate,
    dashboard,
    setDashboard,
    carsOwnwer,
    setCarsOwnwer,
    ownerBookings,
    setOwnerBookings,
    userBookings,
    setUserBookings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
