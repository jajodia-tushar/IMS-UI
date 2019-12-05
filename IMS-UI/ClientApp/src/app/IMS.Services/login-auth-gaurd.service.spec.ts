import { TestBed } from '@angular/core/testing';

import { LoginAuthGaurdService } from './login-auth-gaurd.service';

describe('LoginAuthGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAuthGaurdService = TestBed.get(LoginAuthGaurdService);
    expect(service).toBeTruthy();
  });
});
