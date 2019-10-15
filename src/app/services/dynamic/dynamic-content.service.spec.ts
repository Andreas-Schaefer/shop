import {TestBed} from '@angular/core/testing';

import {DynamicContentService} from './dynamic-content.service';

describe('DynamicContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicContentService = TestBed.get(DynamicContentService);
    expect(service).toBeTruthy();
  });
});
