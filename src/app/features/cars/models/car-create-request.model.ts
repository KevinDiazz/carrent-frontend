import { CarStatus } from "./car-status.model";

export interface CarCreateRequest {
  carModelId: number;
  officeId: number;
  year: number;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  status: CarStatus;
}