import { Injectable } from '@angular/core';
import { WeatherData } from '../models/WeatherData';
import { Forecast } from '../models/Forecast';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {

  constructor() { }

  /**
    This service is only being used as a way to route data between components that share the service.
   */

  weatherNow: WeatherData;
  weatherForecast: Forecast[] = [];
  filteredCities: City[] = [];
  favouriteCities: City[] = [];
  metric: boolean = true;




}
