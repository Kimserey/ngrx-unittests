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
  
  click() {
    this.todos$ = this.service.getAll();
  }

  submit() {
    console.log("test");
  }

  constructor(private service: AppService) { }
}
