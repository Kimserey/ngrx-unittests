import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  getAll() {
    return this.http.get<Todo[]>('/api/todos');
  }

  post(name: string, task: string) {
    return this.http.post('/api/todos', {
      name, task
    });
  }

  constructor(private http: HttpClient) { }
}
