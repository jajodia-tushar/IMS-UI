import { TestBed } from '@angular/core/testing';

import { AnonymousGaurdService } from './anonymous-gaurd.service';

describe('AnonymousGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnonymousGaurdService = TestBed.get(AnonymousGaurdService);
    expect(service).toBeTruthy();
  });
});
