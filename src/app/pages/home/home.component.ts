import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-home.component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PropertyService],
  imports: [CommonModule, HttpClientModule]
})
export class HomeComponent implements OnInit {
  properties: any[] = [];
  showConfirm: boolean = false;
  confirmPropId: string | null = null;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe(data => {
      this.properties = data.items || [];
    });
  }

  refreshProperties(): void {
    this.loadProperties();
  }

  onDeleteClick(propId: string): void {
    this.confirmPropId = propId;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (!this.confirmPropId) return;

    this.propertyService.deleteProperty(this.confirmPropId).subscribe(
      () => {
        this.loadProperties();
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
    this.confirmPropId = null;
  }
}