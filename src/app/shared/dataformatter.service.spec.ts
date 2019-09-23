import { TestBed } from '@angular/core/testing';

import { DataformatterService } from './dataformatter.service';

describe('DataformatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataformatterService = TestBed.get(DataformatterService);
    expect(service).toBeTruthy();
  });
});
