import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AppService } from './app.services';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'frontend-unittests';
  todos$: Observable<Todo[]>;
  notifications: string[];
  form: FormGroup;

  click() {
    this.todos$ = this.service.getAll();
  }

  submit() {
    this.service.post(
      this.name.value,
      this.task.value
    ).subscribe(() => {
      this.notifications.push(`${this.name.value} submitted!`);
      this.form.reset();
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      task: ['', [Validators.required]]
    });

    this.notifications = [];
  }

  get name() {
    return this.form.get('name');
  }

  get task() {
    return this.form.get('task');
  }

  constructor(private fb: FormBuilder, private service: AppService) { }
}
