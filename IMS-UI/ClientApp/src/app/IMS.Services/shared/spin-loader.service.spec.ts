import { TestBed } from '@angular/core/testing';

import { SpinLoaderService } from './spin-loader.service';

describe('SpinLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinLoaderService = TestBed.get(SpinLoaderService);
    expect(service).toBeTruthy();
  });
});
