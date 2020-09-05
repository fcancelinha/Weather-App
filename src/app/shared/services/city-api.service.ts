import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CityApiService {

  protected readonly url: string = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=";
  //OpenDataSoft does not require an API Secret key;

constructor(private httpClient : HttpClient) { }

getCityList(prefix: string){
  return this.httpClient.get(this.url + encodeURIComponent(prefix) + "&rows=5&sort=population&facet=timezone&facet=country");
}




}

