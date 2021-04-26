import { TestBed } from '@angular/core/testing';

import { CoffeeTypesService } from './coffee-types.service';

describe('CoffeeTypesService', () => {
  let service: CoffeeTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
