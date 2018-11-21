import { Circuit } from "../../../../../domain/circuit";
import { Result } from "../../../../../domain/result";
import { QualifyingResult } from "../../../../../domain/qualifying-result";

export class RaceQualifyingTable {

    raceName: string;
    circuit: Circuit;

    result: QualifyingResult;

    constructor(raceName: string, circuit: Circuit, result: QualifyingResult) {
        this.raceName = raceName;
        this.circuit = circuit;
        this.result = result;
    }

    get driverName() {
        return `${this.result.Driver.givenName} ${this.result.Driver.familyName}`
    }

    get q1() {
        return this.result.Q1 === undefined ? '' : `${this.result.Q1}`
    }

    get q2() {
        return this.result.Q2 === undefined ? '' : `${this.result.Q2}`
    }

    get q3() {
        return this.result.Q3 === undefined ? '' : `${this.result.Q3}`
    }
}