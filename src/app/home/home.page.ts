import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/services/weather-api.service';
import { finalize} from 'rxjs/operators'
import { Subscription} from 'rxjs';
import { WeatherData } from '../shared/models/WeatherData';
import { Forecast } from '../shared/models/Forecast';
import { City } from '../shared/models/City';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private weatherApi: WeatherApiService) {
    
  }

  ngOnInit() {}
  
  filtered : City[];
  weatherNow: WeatherData;
  weatherForecast: Forecast[] = [];

  public searchWeather(cityName: string, countryCode: string): void{

    const weatherNowSub: Subscription = this.weatherApi.getWeatherNow(cityName, countryCode).pipe(finalize(() => {
      if(weatherNowSub != null && !weatherNowSub.closed) {
        weatherNowSub.unsubscribe();
      };
    })).subscribe(
       weatherService =>{
        this.weatherNow = weatherService;
          this.searchForecastWeather(this.weatherNow.coord.lat, this.weatherNow.coord.lon);
       }
    );
  } 


  public searchForecastWeather(lat: number, lon: number): void{

    const weatherNowSub: Subscription = this.weatherApi.getWeatherForecast(lat, lon).pipe(finalize(() => {
      if(weatherNowSub != null && !weatherNowSub.closed) {
        weatherNowSub.unsubscribe();
      };
    })).subscribe(
      weatherService => {
            weatherService.slice(1).forEach(day => {
              this.weatherForecast.push(new Forecast(day.dt, day.weather[0].icon, day.temp.day))
          });
        }
      );

  } 



}
