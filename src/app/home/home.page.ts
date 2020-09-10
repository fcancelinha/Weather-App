import { Component, OnInit } from '@angular/core';
import { NavigationDataService } from '../shared/services/navigation-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(public navigation: NavigationDataService) {
    
  }

  ngOnInit() {}
  



}
