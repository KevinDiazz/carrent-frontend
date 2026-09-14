import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationCreateRequest } from '../models/reservation-request.model';
import { ReservationResponse } from '../models/reservation-response.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservations';

  constructor(private http: HttpClient) {}

  createReservation(request: ReservationCreateRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request, {
      withCredentials: true,
    });
  }
  getReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }
  cancelReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
