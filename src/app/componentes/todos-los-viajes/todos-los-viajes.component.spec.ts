import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosViajesComponent } from './todos-los-viajes.component';

describe('TodosLosViajesComponent', () => {
  let component: TodosLosViajesComponent;
  let fixture: ComponentFixture<TodosLosViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosLosViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLosViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
