import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/WeatherData';
import { Daily } from '../models/Daily';
import { map } from 'rxjs/operators';
import { NavigationDataService } from './navigation-data.service';

@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  protected readonly urlNow: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  protected readonly urlForecast: string = 'https://api.openweathermap.org/data/2.5/onecall?';
  private readonly apiKey: string = 'ffd84008a9814acac878bda73f0cb7ec';

constructor(private httpClient : HttpClient) { }


getWeatherNow(cityName: string, countryCode: string, metric: boolean): Observable<WeatherData>{

  let unit = metric ? "metric" : "imperial";

  return this.httpClient.get<WeatherData>( this.urlNow + encodeURIComponent(cityName + "," + countryCode) + "&units=" + encodeURIComponent(unit)  + "&appid=" + this.apiKey);
}

getWeatherForecast(latitude: number, longitude: number): Observable<Daily[]>{

  return this.httpClient.get<{daily: Daily[]}>( this.urlForecast + "lat=" + encodeURIComponent(latitude) + "&lon="+ encodeURIComponent(longitude) + "&exclude=current,hourly,minutely&units=metric&appid=" + this.apiKey)
  .pipe(
    map(data => data && data.daily));
}








}

