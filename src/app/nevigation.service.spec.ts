import { TestBed } from '@angular/core/testing';

import { NevigationService } from './nevigation.service';

describe('NevigationService', () => {
  let service: NevigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NevigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
