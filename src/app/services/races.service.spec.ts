import { TestBed, inject } from '@angular/core/testing';

import { RacesService } from './races.service';

describe('RacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RacesService]
    });
  });

  it('should be created', inject([RacesService], (service: RacesService) => {
    expect(service).toBeTruthy();
  }));
});
