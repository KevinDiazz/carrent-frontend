import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

@Component({
  imports: [],
  selector: 'app-booking-confirm',
  styleUrl: './booking-confirm.css',
  templateUrl: './booking-confirm.html',
})
export class BookingConfirm implements OnInit {
  bookingData: any;
  rentalDays = 0;
  totalPrice = 0;
  constructor(
    private router: Router,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.bookingData = history.state.booking;

    if (!this.bookingData) {
      this.router.navigate(['/cars']);
      return;
    }

    this.calculateBooking();
  }

  calculateBooking(): void {
    const startDate = new Date(this.bookingData.startDate);
    const endDate = new Date(this.bookingData.endDate);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    this.rentalDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    this.totalPrice = this.bookingData.car.pricePerDay * this.rentalDays;
  }

  confirmReservation(): void {
    const request = {
      carModelId: this.bookingData.car.carModelId,
      officeId: Number(this.bookingData.officeId),
      fuelType: this.bookingData.car.fuelType,
      transmission: this.bookingData.car.transmission,
      startDate: this.bookingData.startDate,
      endDate: this.bookingData.endDate,
      pickupTime: this.bookingData.pickupTime,
      returnTime: this.bookingData.returnTime,
    };
    console.log(request)

    this.reservationService.createReservation(request).subscribe({
      next: (reservation) => {
        console.log('Reserva creada:', reservation);
        this.router.navigate(['/booking/success'], {
          state: {
            reservation,
          },
        });
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);
      },
    });
  }
}
