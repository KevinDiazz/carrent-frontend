import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  imports: [],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
   constructor(
    private authService: AuthService,
  ) {}

  register(): void {
    const request = {
      name: 'Admin',
      email: 'admin2@carrent.com',
      password: 'Admin1234',
    };

    this.authService.register(request).subscribe({
      error: (error) => {
        console.error('Error en registro:', error);
      },
    });
  }
}
