import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.css',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AddTenantComponent {
  propId = '';
  TenantContactInfo = '';
  TenantLeaseTermEnd = '';
  TenantLeaseTermStart = '';
  TenantName = '';
  TenantRentalPaymentStatus = 'Pending';

  apiUrl = '/api/v1/tenants';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

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
