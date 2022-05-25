/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecommendationsService } from './recommandations.service';

describe('Service: Recommandations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationsService]
    });
  });

  it('should ...', inject([RecommendationsService], (service: RecommendationsService) => {
    expect(service).toBeTruthy();
  }));
});
