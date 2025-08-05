import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
export class AddEditTenantComponent implements OnInit {
  tenantId: string | null = null;
  propId = '';
  TenantContactInfo = '';
  TenantLeaseTermEnd = '';
  TenantLeaseTermStart = '';
  TenantName = '';
  TenantRentalPaymentStatus = 'Pending';

  properties: Property[] = [];
  
  apiUrl = '/api/v1/tenants';
  propertiesApi = '/api/v1/properties';

  constructor(private http: HttpClient, 
    private router: Router, 
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.get<PropsResponse>(this.propertiesApi)
      .subscribe({
        next: props => this.properties = props.items,
        error: err => console.error('Could not load properties', err)
      });

      this.route.paramMap.subscribe(params => {
        this.tenantId = params.get('id');
        if (this.tenantId){
          this.http.get<any>(`${this.apiUrl}/${this.tenantId}`).subscribe(
            data => {
              this.propId = data.PropId;
              this.TenantName = data.TenantName;
              this.TenantContactInfo = data.TenantContactInfo;
              this.TenantLeaseTermStart = data.TenantLeaseTermStart;
              this.TenantLeaseTermEnd = data.TenantLeaseTermEnd;
              this.TenantRentalPaymentStatus = data.TenantRentalPaymentStatus;
            },
            error => console.error('Failed to load tenant info', error)
          );
        }
      });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const body = {
        PropId: this.propId,
        TenantContactInfo: this.TenantContactInfo,
        TenantLeaseTermStart: this.TenantLeaseTermStart,
        TenantLeaseTermEnd: this.TenantLeaseTermEnd,
        TenantName: this.TenantName,
        TenantRentalPaymentStatus: this.TenantRentalPaymentStatus
      };

      if (this.tenantId){
        this.http.put(`${this.apiUrl}/${this.tenantId}`, body, { headers: { 'Content-Type': 'application/json' } })
        .subscribe({
          next: () => this.router.navigate(['/tenants']),
          error: error => console.error('Failed to update tenant', error)
        });
      } else {
        this.http.post(`${this.apiUrl}`, body, { headers: { 'Content-Type': 'application/json' } })
        .subscribe({
          next: () => this.router.navigate(['/tenants']),
          error: error => console.error('Failed to add tenant', error)
        });
      }
  }

  goBack(): void {
    this.location.back();
  }
}
