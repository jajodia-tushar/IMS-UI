import { TestBed } from '@angular/core/testing';

import { ClerkRouteGuardService } from './clerk-route-guard.service';

describe('ClerkRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClerkRouteGuardService = TestBed.get(ClerkRouteGuardService);
    expect(service).toBeTruthy();
  });
});
