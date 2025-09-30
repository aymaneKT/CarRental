export interface ICar {
  _id?: string;
  owner?: string;
  brand: string;
  model: string;
  image?: string;
  year: number;
  category: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  pricePerDay: number;
  location: string;
  description: string;
  isAvailable?: boolean;
  createdAt?: string;
}
