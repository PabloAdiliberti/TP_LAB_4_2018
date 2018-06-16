import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosViajesParaRemiseroComponent } from './todos-los-viajes-para-remisero.component';

describe('TodosLosViajesParaRemiseroComponent', () => {
  let component: TodosLosViajesParaRemiseroComponent;
  let fixture: ComponentFixture<TodosLosViajesParaRemiseroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosLosViajesParaRemiseroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLosViajesParaRemiseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
