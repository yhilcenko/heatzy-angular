import { TestBed } from '@angular/core/testing';

import { SecureGuard } from './secure.guard';

describe('SecureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureGuard]
    });
  });
});
