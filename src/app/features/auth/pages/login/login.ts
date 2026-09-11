import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isRegister = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  showRegister(): void {
    this.isRegister = true;
  }

  showLogin(): void {
    this.isRegister = false;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        console.log('Login correcto:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error en login:', error);
      },
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    this.authService.register(request).subscribe({
      next: (response) => {
        console.log('Registro correcto:', response);
        this.router.navigate(['/']);
        // Después de registrarse volvemos al login
        this.registerForm.reset();
        this.isRegister = false;
      },
      error: (error) => {
        console.error('Error en registro:', error);
      },
    });
  }
}
