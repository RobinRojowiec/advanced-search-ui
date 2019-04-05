import { TestBed } from '@angular/core/testing';

import { SearchContextService } from './search-context.service';

describe('SearchContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchContextService = TestBed.get(SearchContextService);
    expect(service).toBeTruthy();
  });
});
