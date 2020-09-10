import { Component } from '@angular/core';
import { CityApiService } from './shared/services/city-api.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { City } from './shared/models/City';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { WeatherData } from './shared/models/WeatherData';
import { Forecast } from './shared/models/Forecast';
import { WeatherApiService } from './shared/services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})



export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cityApi: CityApiService,
      
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  filteredCities: City[] = [];
  public getFilteredCities(city: string): City[]{

    this.filteredCities = []; 
    
    const cityFilter: Subscription = this.cityApi.getCityList(city).pipe(finalize(() => {
      if(cityFilter != null && !cityFilter.closed) {
        cityFilter.unsubscribe();
      };
    })).subscribe(cities => {
      cities.forEach(x => {
          this.filteredCities.push(new City(x.name, x.country, x.country_code));
      }   
    )});
    
      return this.filteredCities;
  }

  let



  

}
