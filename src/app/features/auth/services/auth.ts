import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

    login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      'http://localhost:8080/auth/login',
      request,
      {
      withCredentials: true
    }
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      'http://localhost:8080/auth/register',
      request
    );
  }
}
