import { TestBed } from '@angular/core/testing';

import { ProcessBackofficeService } from './process-backoffice.service';

describe('ProcessBackofficeService', () => {
  let service: ProcessBackofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessBackofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
