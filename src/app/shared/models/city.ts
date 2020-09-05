import { ICity } from './ICity';

export class City implements ICity {

    name: string;
    country: string;
    country_code: string;

    constructor(name: string, country: string, country_code: string){
        this.name = name;
        this.country = country;
        this.country_code = country_code;
    }

}
