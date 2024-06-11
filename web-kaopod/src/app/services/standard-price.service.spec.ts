import { TestBed } from '@angular/core/testing';

import { StandardPriceService } from './standard-price.service';

describe('StandardPriceService', () => {
  let service: StandardPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
