import { Component, OnInit } from '@angular/core';
import { CityApiService } from './shared/services/city-api.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { City } from './shared/models/City';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Forecast } from './shared/models/Forecast';
import { WeatherApiService } from './shared/services/weather-api.service';
import { NavigationDataService } from './shared/services/navigation-data.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';  


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})



export class AppComponent implements OnInit {


  faPlusSquare = faPlusSquare;

  constructor(

    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cityApi: CityApiService,
    private weatherApi: WeatherApiService,
    public navigation: NavigationDataService
      
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  public getFilteredCities(city: string): void{

    this.navigation.filteredCities = []; 
    
    const cityFilter: Subscription = this.cityApi.getCityList(city).pipe(finalize(() => {
      if(cityFilter != null && !cityFilter.closed) {
        cityFilter.unsubscribe();
      };
    })).subscribe(cities => {
      cities.forEach(x => {
          this.navigation.filteredCities.push(new City(x.name, x.country, x.country_code));
      }   
    )});

  }

  public searchWeather(cityName: string, countryCode: string, metric: boolean): void{

    const weatherNowSub: Subscription = this.weatherApi.getWeatherNow(cityName, countryCode, metric).pipe(finalize(() => {
      if(weatherNowSub != null && !weatherNowSub.closed) {
        weatherNowSub.unsubscribe();
      };
    })).subscribe(
       weatherService =>{
        this.navigation.weatherNow = weatherService;
          this.searchForecastWeather(this.navigation.weatherNow.coord.lat, this.navigation.weatherNow.coord.lon);
       }
    );
  } 


  private searchForecastWeather(lat: number, lon: number): void{

    this.navigation.weatherForecast = [];

    const weatherNowSub: Subscription = this.weatherApi.getWeatherForecast(lat, lon).pipe(finalize(() => {
      if(weatherNowSub != null && !weatherNowSub.closed) {
        weatherNowSub.unsubscribe();
      };
    })).subscribe(
      weatherService => {
            weatherService.slice(1).forEach(day => {
              this.navigation.weatherForecast.push(new Forecast(day.dt, day.weather[0].icon, day.temp.day))
          });
        }
      );

  } 


  public addToFav(cityName: string, country: string , countryCode: string){

    this.navigation.favouriteCities.push(new City(cityName, country , countryCode));

  }




  

}
