import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/WeatherData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  protected readonly url: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private apiKey: string = 'ffd84008a9814acac878bda73f0cb7ec';

constructor(private httpClient : HttpClient) { }

getWeather(cityName: string, countryCode: string): Observable<WeatherData>{
  return this.httpClient.get<WeatherData>(`${this.url}${encodeURIComponent(cityName + "," + countryCode)}&units=metric&appid=${this.apiKey}`)
  .pipe(map(data => data));
}





}

