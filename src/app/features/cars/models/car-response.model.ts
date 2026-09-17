import { CarStatus } from "./car-status.model";

export interface CarResponse {
  id: number;
  carModelId: number;
  brand: string;
  model: string;
  officeId: number;
  officeName: string;
  year: number;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  status: CarStatus;
}