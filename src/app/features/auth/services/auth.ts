import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { finalize, Observable, tap, ReplaySubject } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<LoginResponse | null>(null);
  private sessionRestored = signal(false);
  private sessionRestoredSubject = new ReplaySubject<void>();
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>( `${this.apiUrl}/login`, request, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.currentUser.set(response);
        }),
      );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>( `${this.apiUrl}/register`, request);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUser();
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
         `${this.apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          this.currentUser.set(null);
        }),
      );
  }
  restoreSession(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/refresh`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => {
          this.currentUser.set(response);
        }),
        finalize(() => {
          this.sessionRestored.set(true);
          this.sessionRestoredSubject.next();
        }),
      );
  }

  isSessionRestored(): boolean {
    return this.sessionRestored();
  }
  waitForSessionRestored(): Observable<void> {
    return this.sessionRestoredSubject.asObservable();
  }
}
