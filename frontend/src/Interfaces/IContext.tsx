import type { useNavigate } from "react-router-dom";
import type { ICar } from "./ICar";
import type axios from "axios";
import type { IUser } from "./IUser";
import type { IDashboard } from "./IDashboard";
import type { IBooking } from "./IBooking";

export interface IContext {
  navigate: ReturnType<typeof useNavigate>;
  currency: string;
  axios: typeof axios;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
  fetchAllCars: () => Promise<void>;
  cars: ICar[];
  setCars: React.Dispatch<React.SetStateAction<ICar[]>>;
  pickUpDate: string;
  setPickUpDate: React.Dispatch<React.SetStateAction<string>>;
  returnDate: string;
  setReturnDate: React.Dispatch<React.SetStateAction<string>>;
  dashboard: IDashboard;
  setDashboard: React.Dispatch<React.SetStateAction<IDashboard>>;
  carsOwnwer: ICar[];
  setCarsOwnwer: React.Dispatch<React.SetStateAction<ICar[]>>;
  ownerBookings: IBooking[];
  setOwnerBookings: React.Dispatch<React.SetStateAction<IBooking[]>>;
  userBookings: IBooking[];
  setUserBookings: React.Dispatch<React.SetStateAction<IBooking[]>>;
}
