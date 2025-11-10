import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskDto } from '../models/task-model-dto';
import { TaskAddDto } from '../models/task-add-model-dto';
import { TaskUpdateDto } from '../models/task-update-model-dto';
import { ApiResponse } from '../models/task-api-response-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/task`;

  getAll(): Observable<ApiResponse<TaskDto[]>> {
    return this.http.get<ApiResponse<TaskDto[]>>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse<TaskDto>> {
    return this.http.get<ApiResponse<TaskDto>>(`${this.baseUrl}/${id}`);
  }

  add(task: TaskAddDto): Observable<ApiResponse<TaskDto>> {
    return this.http.post<ApiResponse<TaskDto>>(this.baseUrl, task);
  }

  update(id: number, task: TaskUpdateDto): Observable<ApiResponse<TaskDto>> {
    return this.http.put<ApiResponse<TaskDto>>(`${this.baseUrl}/${id}`, task);
  }

  delete(taskId: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${taskId}`);
  }
  searchTasks(query: string): Observable<ApiResponse<TaskDto[]>> {
    return this.http.get<ApiResponse<TaskDto[]>>(`${this.baseUrl}/search`, {
      params: { query },
    });
  }
}
