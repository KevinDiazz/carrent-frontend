import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth';
import { OfficeService } from './features/offices/services/office.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('carrent-frontend');
  protected readonly isWakingUp: () => boolean;
  protected readonly appReady = signal(false);
  protected readonly appError = signal(false);

  constructor(
    private authService: AuthService,
    private officeService: OfficeService,
  ) {
    this.isWakingUp = this.authService.isWakingUp;
  }

  ngOnInit(): void {
    this.checkBackend();
  }

  protected retry(): void {
    this.appError.set(false);
    this.checkBackend();
  }

  private checkBackend(): void {
    // Ping a real, DB-backed endpoint: the app must not be usable until
    // the database actually answers, not just until the server process is up.
    this.officeService.getOffices().subscribe({
      next: () => {
        this.appReady.set(true);
        this.restoreSession();
      },
      error: () => {
        this.appError.set(true);
      },
    });
  }

  private restoreSession(): void {
    this.authService.restoreSession().subscribe({
      error: () => {},
    });
  }
}
