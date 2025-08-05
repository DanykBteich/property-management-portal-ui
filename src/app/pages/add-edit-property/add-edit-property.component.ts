import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-property',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.css']
})
export class AddEditPropertyComponent {
  propId: string | null = null;
  propAddress = '';
  propPrice: number | null = null;
  propPurchaseDate = '';
  propStatus = 'Occupied';
  propType = 'Commercial';

  apiUrl = '/api/v1/properties';

  constructor(private http: HttpClient, 
    private router: Router, 
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propId = params.get('id');
      if (this.propId){
        this.http.get<any>(`${this.apiUrl}/${this.propId}`).subscribe(data => {
          this.propAddress = data.PropAddress;
          this.propPrice = data.PropPrice;
          this.propPurchaseDate = data.PropPurchaseDate;
          this.propStatus = data.PropStatus;
          this.propType = data.PropType;
        },
        error => console.error('Failed to load property info', error));
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const body = {
        PropAddress: this.propAddress,
        PropPrice: this.propPrice,
        PropPurchaseDate: this.propPurchaseDate,
        PropStatus: this.propStatus,
        PropType: this.propType
      };
    
    if (this.propId) {
      this.http.put(`${this.apiUrl}/${this.propId}`, body, { headers: { 'Content-Type': 'application/json' } }).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: error => console.error('Failed to update property', error)
      });
    } else {
      this.http.post(this.apiUrl, body, { headers:  { 'Content-Type': 'application/json' } }).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: error => console.error('Failed to add property', error)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}