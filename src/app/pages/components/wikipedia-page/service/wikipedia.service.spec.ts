import { TestBed, inject } from '@angular/core/testing';

import { WikipediaService } from './wikipedia.service';

describe('WikipediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikipediaService]
    });
  });

  it('should be created', inject([WikipediaService], (service: WikipediaService) => {
    expect(service).toBeTruthy();
  }));
});
