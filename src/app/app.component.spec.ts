import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    httpTestingController =
      TestBed.get(HttpTestingController);
  }));

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // .detectChanges() is used to execute the bindings.
    fixture.detectChanges();

    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector('h1').textContent)
      .toContain(app.title);
  });

  it('should execute a first load of the todo list', () => { 
    const fixture = TestBed.createComponent(AppComponent);
    // .detectChanges() is used to execute the bindings and
    // subscribe the observables.
    fixture.detectChanges();
    
    // Test todos.
    const todos = [
      { name: "0", task: "todo 0" },
      { name: "1", task: "todo 1" },
      { name: "2", task: "todo 2" }
    ];

    // Handle mocked GET request.
    const req = httpTestingController.expectOne("/api/todos");
    expect(req.request.method).toEqual("GET");
    req.flush(todos);
    
    // Update bindings with newly retrieved todos.
    fixture.detectChanges();

    // Get a single todo element within the list.
    const todoEl = (key: string) => {
      return fixture.debugElement
        .nativeElement
        .querySelector(`#todo-${key}`);
    }

    // Get the todos list HTML element.
    const todosEl = 
      fixture.debugElement
        .nativeElement
        .querySelector(`#todos`);

    expect(todosEl.children.length).toBe(3);
    expect(todoEl(todos[0].name).textContent).toBe("0: todo 0");
    expect(todoEl(todos[1].name).textContent).toBe("1: todo 1");
    expect(todoEl(todos[2].name).textContent).toBe("2: todo 2");

    httpTestingController.verify();
  });
});
