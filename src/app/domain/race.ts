import { Circuit } from "./circuit";
import { Result } from "./result";

export class Race {

    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    time: string;

    Results: Result[];
}