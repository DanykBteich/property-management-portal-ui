import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks.component',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [TaskService, PropertyService],
  imports: [CommonModule, HttpClientModule]
})
export class TasksComponent {
  tasks: any[] = [];
  properties: any[] = [];
  showConfirm: boolean = false;
  confirmTaskId: string | null = null;

  constructor(private taskService: TaskService, 
    private propertyService: PropertyService, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadPropertiesAndTasks();
  }

  loadPropertiesAndTasks(): void {
    this.propertyService.getProperties().subscribe(propData => {
      this.properties = propData.items || [];
      this.taskService.getTasks().subscribe(taskData => {
        this.tasks = (taskData.items || []).map(task => {
          const property = this.properties.find(p => p.PropId === task.PropId);
          return {...task, PropAddress: property ? property.PropAddress : 'Unknown'};
        });
      });
    });
  }

  refreshTasks(): void {
    this.loadPropertiesAndTasks();
  }

  onDeleteClick(taskId: string): void {
    this.confirmTaskId = taskId;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (!this.confirmTaskId) return;

    this.taskService.deleteTask(this.confirmTaskId).subscribe(
      () => {
        this.loadPropertiesAndTasks();
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
    this.confirmTaskId = null;
  }

  addTask() {
    this.router.navigate(['/add-task']);
  }
}