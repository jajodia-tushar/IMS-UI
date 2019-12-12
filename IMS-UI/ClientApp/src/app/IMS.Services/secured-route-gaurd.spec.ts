import { TestBed } from '@angular/core/testing';
import { SecuredRouteGuard } from './secured-route-guard';

describe('LoginAuthGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecuredRouteGuard = TestBed.get(SecuredRouteGuard);
    expect(service).toBeTruthy();
  });
});
