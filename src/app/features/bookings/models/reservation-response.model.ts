export interface ReservationResponse {
  id: number;
  userId: number;
  userName: string;
  carId: number;
  licensePlate: string;
  brand: string;
  model: string;

  officeId: number;
  officeName: string;
  officeAddress: string;
  officeCity: string;
  officePhone: string;

  startDate: string;
  endDate: string;
  totalPrice: number;
  pickupTime: string;
  returnTime: string;
  status: string;
}
