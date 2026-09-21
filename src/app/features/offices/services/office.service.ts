import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OfficeResponse } from '../models/office-response.model';
import { OfficeCreateRequest } from '../models/office-create-request.model';
import { OfficeUpdateRequest } from '../models/office-update-request.model';
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private readonly apiUrl = `${environment.apiUrl}/offices`;

  constructor(private http: HttpClient) {}

  getOffices(): Observable<OfficeResponse[]> {
    return this.http.get<OfficeResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  createOffice(office: OfficeCreateRequest): Observable<OfficeResponse> {
    return this.http.post<OfficeResponse>(this.apiUrl, office, {
      withCredentials: true,
    });
  }

  updateOffice(id: number, office: OfficeUpdateRequest): Observable<OfficeResponse> {
    return this.http.put<OfficeResponse>(`${this.apiUrl}/${id}`, office, {
      withCredentials: true,
    });
  }

  deleteOffice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
