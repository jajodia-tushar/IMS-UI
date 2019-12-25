import { TestBed } from '@angular/core/testing';

import { VendorOrderdetailsService } from './vendor-orderdetails.service';

describe('VendorOrderdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorOrderdetailsService = TestBed.get(VendorOrderdetailsService);
    expect(service).toBeTruthy();
  });
});
