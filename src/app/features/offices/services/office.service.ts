import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OfficeResponse } from '../models/office-response.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private apiUrl = 'http://localhost:8080/offices';

  constructor(private http: HttpClient) {}

  getOffices(): Observable<OfficeResponse[]> {
    return this.http.get<OfficeResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }
}
