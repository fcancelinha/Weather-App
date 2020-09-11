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
  
/**
 * @param httpClient the http client that will be used to make requests using the appropriate url.
 */
constructor(private httpClient : HttpClient) { }

/**
 * Returns a 5 row query of cities with a name containing the prefix, the object is mapped using pipe/mapping in the request to the object of type Field array
 * which contains the information regarding cities, their countrycode and country name.
 * The returned query is ordered by population and country meaning it will try to search nearby cities of the same country.
 * @param prefix the complete or partial term to be searched
 */
getCityList(prefix: string): Observable<Fields[]>{

 return this.httpClient.get<{records: Record[]}>(this.url + encodeURIComponent(prefix) + "&rows=" + encodeURIComponent(this.ROWS) +"&sort=population&facet=timezone&facet=country")
 .pipe(
    map(data => data && data.records && data.records.map(x => x && x.fields)));
}




}

