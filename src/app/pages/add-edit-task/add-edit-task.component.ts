import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface Property {
  PropId: number;
  PropAddress: string;
}

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AddEditTaskComponent implements OnInit {
  propId = '';
  TaskDescription = '';
  TaskScheduledDate = '';
  TaskStatus = 'In Progress';

  properties: Property[] = [];
  statusOptions = ['Pending', 'In Progress', 'Completed'];

  private tasksApi = '/api/v1/tasks';
  private propertiesApi = '/api/v1/properties';

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.get<{ items: Property[] }>(this.propertiesApi).subscribe({
      next: resp => this.properties = resp.items,
      error: err => console.error('Could not load properties', err)
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const body = {
      PropId: +this.propId,
      TaskDescription: this.TaskDescription,
      TaskScheduledDate: this.TaskScheduledDate,
      TaskStatus: this.TaskStatus
    };

    this.http.post(this.tasksApi, body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: err => console.error('Failed to add task', err)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
