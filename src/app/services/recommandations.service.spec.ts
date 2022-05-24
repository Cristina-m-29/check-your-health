/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecommandationsService } from './recommandations.service';

describe('Service: Recommandations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommandationsService]
    });
  });

  it('should ...', inject([RecommandationsService], (service: RecommandationsService) => {
    expect(service).toBeTruthy();
  }));
});
