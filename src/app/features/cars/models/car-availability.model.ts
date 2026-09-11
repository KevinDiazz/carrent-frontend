export interface CarAvailability {
  carModelId: number;
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  pricePerDay: number;
  availableCars: number;
}