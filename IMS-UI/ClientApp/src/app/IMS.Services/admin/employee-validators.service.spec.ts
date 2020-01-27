import { TestBed } from '@angular/core/testing';

import { EmployeeValidatorsService } from './employee-validators.service';

describe('EmployeeValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeValidatorsService = TestBed.get(EmployeeValidatorsService);
    expect(service).toBeTruthy();
  });
});
