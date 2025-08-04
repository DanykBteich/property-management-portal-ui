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
}
