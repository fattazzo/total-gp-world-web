import { Constructor } from "./constructor";

export class ConstructorStanding {

    position : string;
    positionText: string;
    points: string;
    wins: string;

    Constructor: Constructor;

    constructor(json:any) {
        this.position = json.position;
        this.positionText = json.positionText;
        this.points = json.points;
        this.wins = json.wins;

        this.Constructor = new Constructor(json.Constructor);
    }
}