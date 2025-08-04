import { Component } from '@angular/core';
import { TenantsService } from '../../services/tenants.service';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tenants.component',
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css',
  providers: [TenantsService, PropertyService],
  imports: [CommonModule, HttpClientModule]
})
export class TenantsComponent {
  tenants: any[] = [];
  properties: any[] = [];
  showConfirm: boolean = false;
  confirmTenantId: string | null = null;

  constructor(private tenantService: TenantsService, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadPropertiesAndTenants();
  }

  loadPropertiesAndTenants(): void {
    this.propertyService.getProperties().subscribe(propData => {
      this.properties = propData.items || [];
      this.tenantService.getTenants().subscribe(tenantData => {
        this.tenants = (tenantData.items || []).map(tenant => {
          const property = this.properties.find(p => p.PropId === tenant.PropId);
          return {...tenant, PropAddress: property ? property.PropAddress : 'Unknown'};
        });
      });
    });
  }

  refreshTenants(): void {
    this.loadPropertiesAndTenants();
  }

  onDeleteClick(tenantId: string): void {
    this.confirmTenantId = tenantId;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (!this.confirmTenantId) return;

    this.tenantService.deleteTenant(this.confirmTenantId).subscribe(
      () => {
        this.loadPropertiesAndTenants();
        this.resetDialog();
      },
      error => {
        console.error('Delete failed', error);
        this.resetDialog();
      }
    );
  }

  cancelDelete(): void {
    this.resetDialog();
  }

  private resetDialog(): void {
    this.showConfirm = false;
    this.confirmTenantId = null;
  }
}