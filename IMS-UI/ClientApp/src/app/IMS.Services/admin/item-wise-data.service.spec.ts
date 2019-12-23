import { TestBed } from '@angular/core/testing';

import { ItemWiseDataService } from './item-wise-data.service';

describe('ItemWiseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemWiseDataService = TestBed.get(ItemWiseDataService);
    expect(service).toBeTruthy();
  });
});
