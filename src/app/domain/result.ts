import { Driver } from "./driver";
import { Constructor } from "./constructor";
import { Time } from "./time";
import { FastestLap } from "./fastest-lap";

export class Result {

    number: string;
    position: string;
    positionText: string;
    points: string;

    Driver: Driver;
    Constructor: Constructor;

    grid: string;
    laps: string;
    status: string;

    Time: Time;

    FastestLap: FastestLap;
}