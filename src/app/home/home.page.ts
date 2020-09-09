import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/services/weather-api.service';
import { finalize} from 'rxjs/operators'
import { Subscription} from 'rxjs';
import { CityApiService } from '../shared/services/city-api.service';
import { City } from '../shared/models/City';
import { WeatherData } from '../shared/models/WeatherData';
import { Forecast } from '../shared/models/Forecast';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  filteredCities: City[] = [];
  weatherNow: WeatherData;
  weatherForecast: Forecast[] = [];

  constructor(private weatherApi: WeatherApiService, private cityApi: CityApiService ) {}

  ngOnInit() {}
  

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


  public getFilteredCities(city: string): void{

    this.filteredCities = []; 
    
    const cityFilter: Subscription = this.cityApi.getCityList(city).pipe(finalize(() => {
      if(cityFilter != null && !cityFilter.closed) {
        cityFilter.unsubscribe();
      };
    })).subscribe(cities => {
      cities.forEach(x => {
          this.filteredCities.push(new City(x.name, x.country, x.country_code))
      }
    )});
    
  
  }








 

  



}
