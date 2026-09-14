export interface ReservationCreateRequest {
  carModelId: number;
  officeId: number;
  fuelType: string;
  transmission: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  returnTime: string;
}