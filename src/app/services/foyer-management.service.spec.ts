import { TestBed } from '@angular/core/testing';

import { FoyerManagementService } from './foyer-management.service';

describe('FoyerManagementService', () => {
  let service: FoyerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoyerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
