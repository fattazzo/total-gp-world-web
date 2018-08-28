import { TestBed, inject } from '@angular/core/testing';

import { CircuitsService } from './circuits.service';

describe('CircuitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CircuitsService]
    });
  });

  it('should be created', inject([CircuitsService], (service: CircuitsService) => {
    expect(service).toBeTruthy();
  }));
});
