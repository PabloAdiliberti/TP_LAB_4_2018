import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarViajesComponent } from './asignar-viajes.component';

describe('AsignarViajesComponent', () => {
  let component: AsignarViajesComponent;
  let fixture: ComponentFixture<AsignarViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
