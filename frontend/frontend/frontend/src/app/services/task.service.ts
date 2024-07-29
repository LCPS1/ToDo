import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/Task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Task/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addTask(task: Task): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, task);
  }

  updateTask(id: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, task);
  }
}
