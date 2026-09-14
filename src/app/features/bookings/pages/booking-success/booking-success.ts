import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  imports: [RouterLink],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css',
})
export class BookingSuccess implements OnInit {

  reservation: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.reservation = history.state.reservation;

    if (!this.reservation) {
      this.router.navigate(['/cars']);
      return;
    }
  }
}