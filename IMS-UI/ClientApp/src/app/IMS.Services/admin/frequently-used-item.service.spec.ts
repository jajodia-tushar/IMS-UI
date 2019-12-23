import { TestBed } from '@angular/core/testing';

import { FrequentlyUsedItemService } from './frequently-used-item.service';

describe('FrequentlyUsedItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrequentlyUsedItemService = TestBed.get(FrequentlyUsedItemService);
    expect(service).toBeTruthy();
  });
});
