import { TestBed, inject } from '@angular/core/testing';

import { DriversService } from './drivers.service';

describe('DriversService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversService]
    });
  });

  it('should be created', inject([DriversService], (service: DriversService) => {
    expect(service).toBeTruthy();
  }));
});
