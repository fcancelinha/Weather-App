import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/services/weather-api.service';
import { finalize, filter} from 'rxjs/operators'
import { Subscription, Observable} from 'rxjs';
import { CityApiService } from '../shared/services/city-api.service';
import { City } from '../shared/models/City';
import { WeatherData } from '../shared/models/WeatherData';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  weatherData: WeatherData;
  filteredCities: City[] = [];

  constructor(private weatherApi: WeatherApiService, private cityApi: CityApiService ) {}

  ngOnInit() {}
  

  public searchWeather(cityName: string, countryCode: string){

    const weatherSub: Subscription =  this.weatherApi.getWeather(cityName, countryCode).pipe(finalize(() => {
      if(weatherSub != null && !weatherSub.closed) {
        weatherSub.unsubscribe();
      }
    })).subscribe(
      data => this.weatherData = data);
    
  } 

  public getFilteredCities(city: string){

    this.filteredCities = []; 
    
    const cityFilter: Subscription = this.cityApi.getCityList(city).pipe(finalize(() => {
      if(cityFilter != null && !cityFilter.closed) {
        cityFilter.unsubscribe();
      }
    })).subscribe(cities => {
      cities.forEach(x => {
        if(city)
          this.filteredCities.push(new City(x.name, x.country, x.country_code))
      }
    )});
    
  
  }








 

  



}
