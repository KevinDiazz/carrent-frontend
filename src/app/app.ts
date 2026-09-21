import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('carrent-frontend');
  protected readonly isWakingUp: () => boolean;

  constructor(private authService: AuthService) {
    this.isWakingUp = this.authService.isWakingUp;
  }

  ngOnInit(): void {
    this.authService.restoreSession().subscribe({
      next: (user) => {
        console.log('Sesión restaurada:', user);
      },
      error: () => {
        console.log('No hay sesión activa');
      },
    });
  }
}
