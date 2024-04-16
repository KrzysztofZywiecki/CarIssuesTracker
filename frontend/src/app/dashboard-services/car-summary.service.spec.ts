import { TestBed } from '@angular/core/testing';

import { CarSummaryService } from './car-summary.service';

describe('CarSummaryService', () => {
  let service: CarSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
