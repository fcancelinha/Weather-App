/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavigationDataService } from './navigation-data.service';

describe('Service: NavigationData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationDataService]
    });
  });

  it('should ...', inject([NavigationDataService], (service: NavigationDataService) => {
    expect(service).toBeTruthy();
  }));
});
