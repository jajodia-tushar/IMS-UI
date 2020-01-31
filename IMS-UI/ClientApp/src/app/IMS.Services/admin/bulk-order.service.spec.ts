import { TestBed } from '@angular/core/testing';

import { BulkOrderService } from './bulk-order.service';

describe('BulkOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BulkOrderService = TestBed.get(BulkOrderService);
    expect(service).toBeTruthy();
  });
});
