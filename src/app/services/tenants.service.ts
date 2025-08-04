import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TenantResponse {
  items: any[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class TenantsService {
  private apiUrl = "http://127.0.0.1:5000/api/v1/tenants"

  constructor(private http: HttpClient) {}

  getTenants(): Observable<TenantResponse> {
    return this.http.get<TenantResponse>(this.apiUrl);
  }

  deleteTenant(tenantId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tenantId}`)
  }
}
