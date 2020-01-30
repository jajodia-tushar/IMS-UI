import { TestBed } from '@angular/core/testing';

import { VendorValidatorService } from './vendor-validator.service';

describe('VendorValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorValidatorService = TestBed.get(VendorValidatorService);
    expect(service).toBeTruthy();
  });
});
