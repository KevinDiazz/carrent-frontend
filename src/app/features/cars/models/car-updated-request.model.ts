import { CarStatus } from "./car-status.model";

export interface CarUpdateRequest {
  carModelId: number;
  officeId: number;
  year: number;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  status: CarStatus;
}