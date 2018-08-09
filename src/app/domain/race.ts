import { Circuit } from "./circuit";

export class Race {

    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    time: string;

    constructor(json: any) {
        this.season = json.season;
        this.round = json.round;
        this.url = json.url;
        this.raceName = json.raceName;
        this.Circuit = new Circuit(json.Circuit);
        this.date = json.date;
        this.time = json.time;
    }
}