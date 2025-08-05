import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Property {
  PropId: number;
  PropAddress: string;
}
interface PropsResponse {
  items: Property[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

@Component({
  selector: 'app-add-edit-tenant',
  standalone: true,
  templateUrl: './add-edit-tenant.component.html',
  styleUrl: './add-edit-tenant.component.css',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AddEditTenantComponent {
  propId = '';
  TenantContactInfo = '';
  TenantLeaseTermEnd = '';
  TenantLeaseTermStart = '';
  TenantName = '';
  TenantRentalPaymentStatus = 'Pending';

  properties: Property[] = [];
  
  apiUrl = '/api/v1/tenants';
  propertiesApi = '/api/v1/properties';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.http.get<PropsResponse>(this.propertiesApi)
      .subscribe({
        next: props => this.properties = props.items,
        error: err => console.error('Could not load properties', err)
      });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const body = {
        PropId: this.propId,
        TenantContactInfo: this.TenantContactInfo,
        TenantLeaseTermStart: this.TenantLeaseTermStart,
        TenantLeaseTermEnd: this.TenantLeaseTermEnd,
        TenantName: this.TenantName,
        TenantRentalPaymentStatus: this.TenantRentalPaymentStatus
      };

      const headers = { 'content-Type': 'application/json' };

      this.http.post(this.apiUrl, body, { headers }).subscribe({
        next: () => this.router.navigate(['/tenants']),
        error: err => console.error('Failed to add tenant', err)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
