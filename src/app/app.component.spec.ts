import { TestBed, async } from '@angular/core/testing';
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
    const fixture = 
      TestBed.createComponent(AppComponent);
    
    const app = 
      fixture.debugElement.componentInstance;

    app.ngOnInit();

    fixture.detectChanges();

    const req =
      httpTestingController.expectOne('/api/todo');

    expect(req.request.method).toEqual('GET');

    req.flush([
      { name: '0', task: 'todo 0' },
      { name: '1', task: 'todo 1' },
      { name: '2', task: 'todo 2' }
    ]);

    httpTestingController.verify();
  });
});
