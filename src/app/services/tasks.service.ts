import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TaskResponse {
  items: any[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = "http://127.0.0.1:5000/api/v1/tasks"

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(this.apiUrl);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`)
  }
}
