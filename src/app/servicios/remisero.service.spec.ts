import { TestBed, inject } from '@angular/core/testing';

import { RemiseroService } from './remisero.service';

describe('RemiseroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemiseroService]
    });
  });

  it('should be created', inject([RemiseroService], (service: RemiseroService) => {
    expect(service).toBeTruthy();
  }));
});
