import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemiseroViajesComponent } from './remisero-viajes.component';

describe('RemiseroViajesComponent', () => {
  let component: RemiseroViajesComponent;
  let fixture: ComponentFixture<RemiseroViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemiseroViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemiseroViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
