import { Location } from "./location";

export class Circuit {

    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;

    constructor(json: any) {

        this.circuitId = json.circuitId;
        this.url = json.url;
        this.circuitName = json.circuitName;
        this.Location = json.Location;
    }
}