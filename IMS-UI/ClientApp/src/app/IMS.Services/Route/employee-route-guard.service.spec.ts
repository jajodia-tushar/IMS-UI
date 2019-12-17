import { TestBed } from '@angular/core/testing';

import { EmployeeRouteGuardService } from './employee-route-guard.service';

describe('EmployeeRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeRouteGuardService = TestBed.get(EmployeeRouteGuardService);
    expect(service).toBeTruthy();
  });
});
