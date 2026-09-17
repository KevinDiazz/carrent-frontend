import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarAvailability } from '../models/car-availability.model';
import { CarResponse } from '../models/car-response.model';
import { CarCreateRequest } from '../models/car-create-request.model';
import { CarUpdateRequest } from '../models/car-updated-request.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  getAvailableCars(
    startDate: string,
    endDate: string,
    officeId: number,
  ): Observable<CarAvailability[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('officeId', officeId);

    return this.http.get<CarAvailability[]>(`${this.apiUrl}/available`, {
      params,
      withCredentials: true,
    });
  }
  getCars(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }
  createCar(car: CarCreateRequest): Observable<CarResponse> {
    return this.http.post<CarResponse>(this.apiUrl, car, {
      withCredentials: true,
    });
  }

  updateCar(id: number, car: CarUpdateRequest): Observable<CarResponse> {
    return this.http.put<CarResponse>(`${this.apiUrl}/${id}`, car, {
      withCredentials: true,
    });
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
