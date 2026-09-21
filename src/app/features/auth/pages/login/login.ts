import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
  ) {}

  isRegister = signal(false);
  loginError = signal('');
  registerError = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('CAMBIO:', params);

      this.isRegister.set(params['register'] === 'true');

      console.log('isRegister:', this.isRegister);
    });
  }

  showRegister(): void {
    this.isRegister.set(true);
  }

  showLogin(): void {
    this.isRegister.set(false);
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
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.router.navigateByUrl(returnUrl ?? '/');
      },
      error: (error) => {
        this.loginError.set('El email o la contraseña no son correctos.*');
        console.error('Error en login:', error);
      },
    });
  }

  register(): void {
    this.registerError.set('');
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
        this.isRegister.set(false);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        if (error.status === 409) {
          this.registerError.set('Este email ya está registrado.');
          return;
        }

        this.registerError.set('Ha ocurrido un error. Inténtalo de nuevo.');
      },
    });
  }
}
