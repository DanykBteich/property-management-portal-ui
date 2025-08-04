import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PropertyResponse {
  items: any[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1/properties';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(this.apiUrl);
  }

  deleteProperty(propId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${propId}`)
  }
}