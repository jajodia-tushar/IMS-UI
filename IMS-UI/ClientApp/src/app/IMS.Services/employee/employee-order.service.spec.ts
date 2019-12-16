import { TestBed } from '@angular/core/testing';

import { EmployeeOrderService } from './employee-order.service';

describe('EmployeeOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeOrderService = TestBed.get(EmployeeOrderService);
    expect(service).toBeTruthy();
  });
});
