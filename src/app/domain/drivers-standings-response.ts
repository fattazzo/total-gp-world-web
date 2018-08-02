import { MRData } from "./mrdata";

export class DriverStandingsResponse {
    MRData : MRData;

    constructor(json:any) {
        this.MRData = new MRData(json.MRData)    
    }

    toString() : string {
        return `DriverStandingsResponse (${this.MRData.toString()})`;
    }
  }