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

constructor(private httpClient : HttpClient, private navigate: NavigationDataService) { }


/**
 * Switches the API response to Celsius or Fahrenheit
 */
getUnit(): string{
  return this.navigate.metric ? "metric" : "imperial";
}

/**
 * Searches the current weather.
 * @param cityName the full city name to be searched.
 * @param countryCode the country code, since there are various cities that share the same name so this ensures 
    that the correct city a user is looking for is the correct one.
 */
getWeatherNow(cityName: string, countryCode: string): Observable<WeatherData>{

  return this.httpClient.get<WeatherData>( this.urlNow + encodeURIComponent(cityName + "," + countryCode) + "&units=" + encodeURIComponent(this.getUnit())  + "&appid=" + this.apiKey);
}

/**
 * Searches the forecast weather for the next 7 days, since it uses the OpenAPICall, there's the need to use Latitude and Longitude which we get 
   from the WeatherData object further on. Mapping is used to retrieve only the property of the API response that is needed.
   Since the openCall API is a one-stop-for-everything , the url is excluding hourly, minutely and daily reports.
 * @param latitude 
 * @param longitude 
 */
getWeatherForecast(latitude: number, longitude: number): Observable<Daily[]>{

  return this.httpClient.get<{daily: Daily[]}>( this.urlForecast + "lat=" + encodeURIComponent(latitude) + "&lon="+ encodeURIComponent(longitude) + "&exclude=current,hourly,minutely&units="+ encodeURIComponent(this.getUnit())  + "&appid=" + this.apiKey)
  .pipe(
    map(data => data && data.daily));
}








}

