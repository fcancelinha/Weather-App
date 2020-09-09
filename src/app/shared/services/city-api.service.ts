import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/Record';
import { map, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Fields } from '../models/Fields';

@Injectable({
  providedIn: 'root'
})

export class CityApiService {
  [x: string]: any;

  //OpenDataSoft does not require an API Secret key;
  protected readonly url: string = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=";

  //Number of rows returned by the API response sorted by population;
  private readonly ROWS = 5;
  

constructor(private httpClient : HttpClient) { }

getCityList(prefix: string): Observable<Fields[]>{

 return this.httpClient.get<{records: Record[]}>(this.url + encodeURIComponent(prefix) + "&rows=" + encodeURIComponent(this.ROWS) +"&sort=population&facet=timezone&facet=country")
 .pipe(
    map(data => data && data.records && data.records.map(x => x && x.fields)));
}




}

