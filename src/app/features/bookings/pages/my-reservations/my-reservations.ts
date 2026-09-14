import { Component, OnInit, signal } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ReservationResponse } from '../../models/reservation-response.model';

@Component({
  selector: 'app-my-reservations',
  imports: [],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
})
export class MyReservations implements OnInit {
  reservations = signal<ReservationResponse[]>([]);
  reservationToCancel = signal<number | null>(null);
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
        console.log('Mis reservas:', reservations);
      },
      error: (error) => {
        console.error('Error al obtener las reservas:', error);
      },
    });
  }
  cancelReservation(): void {
    const id = this.reservationToCancel();

    if (id === null) {
      return;
    }

    this.reservationService.cancelReservation(id).subscribe({
      next: () => {
        console.log('Reserva cancelada:', id);

        this.reservationToCancel.set(null);
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
      },
    });
  }
  confirmCancelReservation(id: number): void {
    this.reservationToCancel.set(id);
  }
  closeCancelModal(): void {
    this.reservationToCancel.set(null);
  }
}
