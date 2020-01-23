import { TestBed } from '@angular/core/testing';

import { BulkRequestService } from './bulk-request.service';

describe('BulkRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BulkRequestService = TestBed.get(BulkRequestService);
    expect(service).toBeTruthy();
  });
});
