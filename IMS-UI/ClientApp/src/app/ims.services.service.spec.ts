import { TestBed } from '@angular/core/testing';

import { IMS.ServicesService } from './ims.services.service';

describe('IMS.ServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IMS.ServicesService = TestBed.get(IMS.ServicesService);
    expect(service).toBeTruthy();
  });
});
