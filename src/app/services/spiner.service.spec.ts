import { TestBed } from '@angular/core/testing';

import { SpinerService } from './spiner.service';

describe('SpinerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinerService = TestBed.get(SpinerService);
    expect(service).toBeTruthy();
  });
});
