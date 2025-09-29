import type { IBooking } from "./IBooking";

export interface IDashboard {
  totalCars: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: IBooking[];
  monthlyRevenue: number;
}
