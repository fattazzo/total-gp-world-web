import { Circuit } from "../../../../../domain/circuit";
import { Result } from "../../../../../domain/result";

export class RaceResultsTable {

    raceName: string;
    circuit: Circuit;

    result: Result;

    constructor(raceName: string, circuit: Circuit, result: Result) {
        this.raceName = raceName;
        this.circuit = circuit;
        this.result = result;
    }

    get time() {
        return this.result.Time === undefined ? '' : this.result.Time.time
    }

    get driverName() {
        return `${this.result.Driver.givenName} ${this.result.Driver.familyName}`
    }
}