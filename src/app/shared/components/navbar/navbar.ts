import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  get currentUser() {
  console.log('NAVBAR USER:', this.authService.getCurrentUser());
    return this.authService.getCurrentUser();
  }

 logout(): void {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Error al cerrar sesión', error);
    },
  });
}
}
