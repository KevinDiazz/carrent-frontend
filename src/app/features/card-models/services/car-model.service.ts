import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModelResponse } from '../models/car-model.model';
import { CarModelCreateRequest } from '../models/card-model-request.model';
import { CarModelUpdateRequest } from '../models/car-model-update-request.model';
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  private readonly apiUrl = `${environment.apiUrl}/car-models`;
  constructor(private http: HttpClient) {}

  getCarModels(): Observable<CarModelResponse[]> {
    return this.http.get<CarModelResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  createCarModel(carModel: CarModelCreateRequest): Observable<CarModelResponse> {
    return this.http.post<CarModelResponse>(this.apiUrl, carModel, {
      withCredentials: true,
    });
  }

  updateCarModel(id: number, carModel: CarModelUpdateRequest): Observable<CarModelResponse> {
    return this.http.put<CarModelResponse>(`${this.apiUrl}/${id}`, carModel, {
      withCredentials: true,
    });
  }
}
