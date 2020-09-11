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

  //FontAwesome Icon, just aesthetic.
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


  /**
   * Creates an array of Cities which contain the city name, country and country code
     this is in turn used to give the user a ful list of cities that contain that search term
   * @param city search query from the search bar
   */
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

  /**
   * Creates an object with the current weather data and triggers the forecast method passing as parameters the latitude and longitude
   * @param cityName 
   * @param countryCode 
   */
  public searchWeather(cityName: string, countryCode: string): void{

    const weatherNowSub: Subscription = this.weatherApi.getWeatherNow(cityName, countryCode).pipe(finalize(() => {
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

  /**
   * Gets the 7-day forecast for the selected city and creates and array with an object of type Forecast
     with the information we're looking for. Inside the Forecast class constructor the (dt)timestamp is treated
     with new Date().tolocalstring method and the (temp) with toFixed(). Refer to the Forecast mdoel
   * @param lat latitude
   * @param lon longitude
   */
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

  /**
   * Adds a city to a list of favourite cities if it doesn't already contain it
   * @param cityName 
   * @param country 
   * @param countryCode 
   */
  public addToFav(cityName: string, country: string , countryCode: string): void{

    if(this.navigation.favouriteCities.every(city => city.name != cityName))
      this.navigation.favouriteCities.push(new City(cityName, country , countryCode));
  }

  /**
   * deletes a city from the favourite's list.
   * @param cityName 
   */
  public removeFromFav(cityName: string): void{
    this.navigation.favouriteCities.splice(this.navigation.favouriteCities.findIndex(city => city.name == cityName), 1);
  }



  

}
