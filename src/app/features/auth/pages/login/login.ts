import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { ReservationService } from '../../../bookings/services/reservation.service';
@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
  ) {}

  login(): void {
    const request = {
      email: 'admin@carrent.com',
      password: 'Admin1234',
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        console.log('Login correcto:', response);
      },
      error: (error) => {
        console.error('Error en login:', error);
      },
    });
  }
}
