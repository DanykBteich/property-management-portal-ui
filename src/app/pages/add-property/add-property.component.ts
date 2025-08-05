import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  propAddress = '';
  propPrice: number | null = null;
  propPurchaseDate = '';
  propStatus = 'Occupied';
  propType = 'Commercial';

  apiUrl = '/api/v1/properties';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const body = {
        PropAddress: this.propAddress,
        PropPrice: this.propPrice,
        PropPurchaseDate: this.propPurchaseDate,
        PropStatus: this.propStatus,
        PropType: this.propType
      };

      const headers = { 'Content-Type': 'application/json' };

      this.http.post(this.apiUrl, body, { headers }).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: err => console.error('Failed to add property', err)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}