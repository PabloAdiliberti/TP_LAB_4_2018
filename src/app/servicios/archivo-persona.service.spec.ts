import { TestBed, inject } from '@angular/core/testing';

import { ArchivoPersonaService } from './archivo-persona.service';

describe('ArchivoPersonaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivoPersonaService]
    });
  });

  it('should be created', inject([ArchivoPersonaService], (service: ArchivoPersonaService) => {
    expect(service).toBeTruthy();
  }));
});
