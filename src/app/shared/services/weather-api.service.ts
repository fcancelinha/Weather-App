import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherApiService {

  protected readonly url: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private apiKey: string = 'ffd84008a9814acac878bda73f0cb7ec';

constructor(private httpClient : HttpClient) { }


getWeather(cityName: string){
  return this.httpClient.get(this.url + encodeURIComponent(cityName) + "&units=metric" + "&appid=" + this.apiKey)
}





}

