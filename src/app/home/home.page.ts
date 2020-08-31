import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/services/weather-api.service';
import { CityHandler } from '../shared/models/city-handler';
import { City } from '../shared/models/city';
import { finalize } from 'rxjs/operators'
import { Subscription, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  weatherData: any;
  city: string = 'London';
  searchTerm: string;
  cityHandler: CityHandler;
  items: City[];

  constructor(private weatherApi: WeatherApiService) {
      this.cityHandler = new CityHandler();
  }

  ngOnInit() {

    const weatherSub: Subscription =  this.weatherApi.getWeather(this.city).pipe(finalize(() => {
      if(weatherSub != null && !weatherSub.closed) {
        weatherSub.unsubscribe();
      }
    })).subscribe(data =>{this.weatherData = data;})

  }
    
  searchCity(searchTerm: string){
    
    this.items = this.cityHandler.filterCities(searchTerm);
       
  }



 

  



}
