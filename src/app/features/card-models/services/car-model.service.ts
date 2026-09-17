import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CarModelResponse } from '../models/car-model.model';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  private apiUrl = 'http://localhost:8080/car-models';

  constructor(private http: HttpClient) {}

  getCarModels(): Observable<CarModelResponse[]> {
    return this.http.get<CarModelResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }
}
