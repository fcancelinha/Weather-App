import { Component, OnInit } from '@angular/core';
import { NavigationDataService } from '../shared/services/navigation-data.service';  
import { faTint } from '@fortawesome/free-solid-svg-icons';  
import { faWater } from '@fortawesome/free-solid-svg-icons';  
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';  


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

    faTint = faTint;
    faWater = faWater;
    faThermometerHalf = faThermometerHalf;
  

  constructor(public navigation: NavigationDataService) {
    
  }

  ngOnInit() {}
  
  addToFavourites(){

  }


}
