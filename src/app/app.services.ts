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

  constructor(private http: HttpClient) { }
}
