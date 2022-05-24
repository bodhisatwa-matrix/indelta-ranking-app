import { TestBed } from '@angular/core/testing';

import { ToCsvService } from './to-csv.service';

describe('ToCsvService', () => {
  let service: ToCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
