import { TestBed } from '@angular/core/testing';

import { RagStatusService } from './rag-status.service';

describe('RagStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RagStatusService = TestBed.get(RagStatusService);
    expect(service).toBeTruthy();
  });
});
