import { Driver } from "./driver";
import { Constructor } from "./constructor";

export class DriverStanding {

    position : string;
    positionText: string;
    points: string;
    wins: string;

    Driver: Driver;

    constructors: Array<Constructor>;

    constructor(json:any) {
        this.position = json.position;
        this.positionText = json.positionText;
        this.points = json.points;
        this.wins = json.wins;

        this.Driver = new Driver(json.Driver);
    }
}