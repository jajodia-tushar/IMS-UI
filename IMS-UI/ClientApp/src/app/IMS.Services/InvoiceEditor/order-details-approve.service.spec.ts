import { TestBed } from '@angular/core/testing';

import { OrderDetailsApproveService } from './order-details-approve.service';

describe('OrderDetailsApproveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDetailsApproveService = TestBed.get(OrderDetailsApproveService);
    expect(service).toBeTruthy();
  });
});
