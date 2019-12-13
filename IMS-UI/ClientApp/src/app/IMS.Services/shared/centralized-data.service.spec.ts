import { TestBed } from '@angular/core/testing';

import { CentralizedDataService } from './centralized-data.service';

describe('CentralizedDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentralizedDataService = TestBed.get(CentralizedDataService);
    expect(service).toBeTruthy();
  });
});
