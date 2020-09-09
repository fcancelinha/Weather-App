import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/services/weather-api.service';
import { finalize, filter} from 'rxjs/operators'
import { Subscription, Observable} from 'rxjs';
import { CityApiService } from '../shared/services/city-api.service';
import { ICity } from '../shared/models/ICity';
import { City } from '../shared/models/City';
import { KeyedWrite } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  weatherData: any;
  cities: City[] = [];
  city: string;


  constructor(private weatherApi: WeatherApiService, private cityApi: CityApiService ) {}

  ngOnInit() {

  }
  
  
  public searchWeather(cityName: string){

    this.clearResult();

    const weatherSub: Subscription =  this.weatherApi.getWeather(cityName).pipe(finalize(() => {
      if(weatherSub != null && !weatherSub.closed) {
        weatherSub.unsubscribe();
      }
    })).subscribe(data =>{
      console.log(data);
      this.weatherData = data;
    })
    
  } 

  public getFilteredCities(city: string){

    this.clearResult();
    
    const filteredCities: Subscription = this.cityApi.getCityList(city).pipe(finalize(() => {
      if(filteredCities != null && !filteredCities.closed) {
        filteredCities.unsubscribe();
      }
    })).subscribe( cities => {

      console.log(cities);
      this.cities.push(new City(cities["name"], cities["country"], cities["country_code"]))
    
    })
    
  
  }


  private clearResult(){
    this.cities = []; 
  }








 

  



}
