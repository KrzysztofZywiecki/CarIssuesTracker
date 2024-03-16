import { TestBed } from '@angular/core/testing';

import { CarIssuesService } from './car-issues.service';

describe('CarIssuesService', () => {
  let service: CarIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
