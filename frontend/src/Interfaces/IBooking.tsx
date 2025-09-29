import type { ICar } from "./ICar";

export interface IBooking {
  _id?: string;
  car?: ICar;
  user?: string;
  owner?: string;
  pickupDate?: string;
  returnDate?: string;
  status?: string;
  price?: number;
  createdAt?: string;
}
