import { TestBed } from '@angular/core/testing';

import { GuardNoAuthService } from './guard-no-auth.service';

describe('GuardNoAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardNoAuthService = TestBed.get(GuardNoAuthService);
    expect(service).toBeTruthy();
  });
});
