import { TestBed } from '@angular/core/testing';

import { RecentEntriesService } from './recent-entries.service';

describe('RecentEntriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentEntriesService = TestBed.get(RecentEntriesService);
    expect(service).toBeTruthy();
  });
});
