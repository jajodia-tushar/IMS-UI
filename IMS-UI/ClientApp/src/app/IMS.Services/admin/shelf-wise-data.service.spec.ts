import { TestBed } from '@angular/core/testing';

import { ShelfWiseDataService } from './shelf-wise-data.service';

describe('ShelfWiseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShelfWiseDataService = TestBed.get(ShelfWiseDataService);
    expect(service).toBeTruthy();
  });
});
