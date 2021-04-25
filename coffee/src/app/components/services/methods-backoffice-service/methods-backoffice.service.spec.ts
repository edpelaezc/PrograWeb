import { TestBed } from '@angular/core/testing';

import { MethodsBackofficeService } from './methods-backoffice.service';

describe('MethodsBackofficeService', () => {
  let service: MethodsBackofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodsBackofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
