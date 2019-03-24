import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.services';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl:'./app.template.html'
})
export class AppComponent {
  title = 'frontend-unittests';
  todos$: Observable<Todo[]>;
  
  constructor(service: AppService) {
    this.todos$ = service.getAll();
  }
}
