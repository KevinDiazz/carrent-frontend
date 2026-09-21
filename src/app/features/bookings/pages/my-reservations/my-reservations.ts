import { Component, OnInit, signal,computed } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ReservationResponse } from '../../models/reservation-response.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-reservations',
  imports: [RouterLink],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
})
export class MyReservations implements OnInit {
  reservations = signal<ReservationResponse[]>([]);
  reservationToCancel = signal<number | null>(null);
    selectedTab = signal<'CONFIRMED' | 'CANCELLED'>('CONFIRMED');
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


  confirmedReservations = computed(() => {
    return this.reservations()
      .filter((reservation) => reservation.status === 'CONFIRMED')
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() -
          new Date(b.startDate).getTime()
      );
  });

  cancelledReservations = computed(() => {
    return this.reservations()
      .filter((reservation) => reservation.status === 'CANCELLED')
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() -
          new Date(b.startDate).getTime()
      );
  });
  selectTab(tab: 'CONFIRMED' | 'CANCELLED'): void {
    this.selectedTab.set(tab);
  }

}
