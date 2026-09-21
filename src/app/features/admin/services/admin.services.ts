import { Injectable, signal } from '@angular/core';
import { CarService } from '../../cars/services/car.service';
import { CarModelService } from '../../card-models/services/car-model.service';
import { ReservationService } from '../../bookings/services/reservation.service';
import { OfficeService } from '../../offices/services/office.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  totalCars = signal(0);
  totalCarModels = signal(0);
  totalReservations = signal(0);
  totalOffices = signal(0);
  constructor(
    private carService: CarService,
    private carModelService: CarModelService,
    private reservationService: ReservationService,
    private officeService: OfficeService,
  ) {}

  loadTotalCars(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.totalCars.set(cars.length);
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      },
    });
  }
  loadTotalCarModels(): void {
    this.carModelService.getCarModels().subscribe({
      next: (carModels) => {
        this.totalCarModels.set(carModels.length);
      },
      error: (error) => {
        console.error('Error al obtener los modelos:', error);
      },
    });
  }
  loadTotalReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.totalReservations.set(reservations.length);
      },
      error: (error) => {
        console.error('Error al obtener las reservas:', error);
      },
    });
  }
  loadTotalOffices(): void {
    this.officeService.getOffices().subscribe({
      next: (offices) => {
        console.log(offices.length);
        this.totalOffices.set(offices.length);
      },
      error: (error) => {
        console.error('Error al obtener las oficinas:', error);
      },
    });
  }
}
