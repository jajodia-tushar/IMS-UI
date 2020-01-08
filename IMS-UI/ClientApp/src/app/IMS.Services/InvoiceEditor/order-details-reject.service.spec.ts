import { TestBed } from '@angular/core/testing';

import { OrderDetailsRejectService } from './order-details-reject.service';

describe('OrderDetailsRejectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailsRejectService = TestBed.get(OrderDetailsRejectService);
    expect(service).toBeTruthy();
  });
});
