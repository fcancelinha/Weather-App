export class Forecast {

    day: string;
    icon: string;
    temp: string;

    constructor(dt: number, icon: string, temp: number){

        this.day = new Date(dt * 1000).toDateString().slice(0, 3);
        this.icon = icon;
        this.temp = temp.toFixed();
    }


}
