import { City } from './city';
import CityList from '../../../assets/CityList.json';

export class CityHandler {

    private cities: City[] = [];

    constructor(){
        this.JSONtoArray();
    }

    private JSONtoArray(){

        console.log(CityList);

        for(let element in CityList){
            this.cities.push(new City(element['id'], element['name'], element['country']));
        }
    } 
    //this.cities = cityList

    public filterCities(cityName: string): City[]{

        return this.cities.filter(item => item.name.includes(cityName));
    }


}
