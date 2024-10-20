import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


export interface Task {

  id: number;

  title: string;

  description?: string;

}


@Injectable({

  providedIn: 'root'

})

export class TodoService {

  private apiUrl = 'http://127.0.0.1:5000/tasks'; // Your Flask API URL


  constructor(private http: HttpClient) {}


  getTasks(): Observable<Task[]> {

    return this.http.get<Task[]>(this.apiUrl);

  }


  createTask(task: Task): Observable<Task> {

    return this.http.post<Task>(this.apiUrl, task);

  }


  updateTask(task: Task): Observable<Task> {

    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);

  }


  deleteTask(taskId: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${taskId}`);

  }

}
