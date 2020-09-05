/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CityApiService } from './city-api.service';

describe('Service: CityApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityApiService]
    });
  });

  it('should ...', inject([CityApiService], (service: CityApiService) => {
    expect(service).toBeTruthy();
  }));
});
