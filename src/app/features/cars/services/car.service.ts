import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarAvailability } from '../models/car-availability.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  getAvailableCars(
    startDate: string,
    endDate: string,
    officeId: number
  ): Observable<CarAvailability[]> {

    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('officeId', officeId);

    return this.http.get<CarAvailability[]>(
      `${this.apiUrl}/available`,
      {
        params,
        withCredentials: true
      }
    );
  }
}