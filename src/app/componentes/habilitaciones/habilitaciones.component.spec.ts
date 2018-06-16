import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitacionesComponent } from './habilitaciones.component';

describe('HabilitacionesComponent', () => {
  let component: HabilitacionesComponent;
  let fixture: ComponentFixture<HabilitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
