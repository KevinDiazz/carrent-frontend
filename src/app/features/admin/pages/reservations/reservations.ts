import { Component, OnInit, computed, signal } from '@angular/core';

import { ReservationService } from '../../../bookings/services/reservation.service';
import { ReservationResponse } from '../../../bookings/models/reservation-response.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  imports: [DecimalPipe],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations implements OnInit {
  reservations = signal<ReservationResponse[]>([]);
  searchTerm = signal('');

  showCancelModal = signal(false);
  reservationToCancel = signal<ReservationResponse | null>(null);
  sortBy = signal<'date' | 'status' | 'office'>('date');
  sortDirection = signal<'asc' | 'desc'>('desc');
  filteredReservations = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    const filtered = this.reservations().filter((reservation) =>
      [
        reservation.userName,
        reservation.licensePlate,
        reservation.brand,
        reservation.model,
        reservation.officeName,
        reservation.officeCity,
        reservation.status,
      ].some((value) => value.toLowerCase().includes(search)),
    );

    const direction = this.sortDirection() === 'asc' ? 1 : -1;

    return [...filtered].sort((a, b) => {
      switch (this.sortBy()) {
        case 'date':
          return (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) * direction;

        case 'status':
          return a.status.localeCompare(b.status) * direction;

        case 'office':
          return a.officeName.localeCompare(b.officeName) * direction;

        default:
          return 0;
      }
    });
  });

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
      },
      error: (error) => {
        console.error('Error al cargar las reservas:', error);
      },
    });
  }

  openCancelModal(reservation: ReservationResponse): void {
    this.reservationToCancel.set(reservation);
    this.showCancelModal.set(true);
  }

  closeCancelModal(): void {
    this.showCancelModal.set(false);
    this.reservationToCancel.set(null);
  }

  cancelReservation(): void {
    const reservation = this.reservationToCancel();

    if (!reservation) {
      return;
    }

    this.reservationService.cancelReservation(reservation.id).subscribe({
      next: () => {
        this.closeCancelModal();
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);

        alert('No se ha podido cancelar la reserva.');
        this.closeCancelModal();
      },
    });
  }
}
