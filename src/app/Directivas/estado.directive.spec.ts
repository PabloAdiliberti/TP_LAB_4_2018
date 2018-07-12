import { EstadoDirective } from './estado.directive';
import { ElementRef } from '@angular/core';

describe('EstadoDirective', () => {
  it('should create an instance', () => {
    const directive = new EstadoDirective(new ElementRef(new alert()));
    expect(directive).toBeTruthy();
  });
});
