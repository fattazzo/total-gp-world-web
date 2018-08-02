import { MRData } from "./mrdata";

export class SeasonsResponse {
    MRData : MRData;

    constructor(json:any) {
        this.MRData = new MRData(json.MRData)    
    }

    toString() : string {
        return `SeasonsResponse (${this.MRData.toString()})`;
    }
  }