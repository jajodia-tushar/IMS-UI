import { TestBed } from '@angular/core/testing';

import { RandomColorGeneratorService } from './random-color-generator.service';

describe('RandomColorGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomColorGeneratorService = TestBed.get(RandomColorGeneratorService);
    expect(service).toBeTruthy();
  });
});
