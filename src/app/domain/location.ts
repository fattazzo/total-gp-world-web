export class Location {

    lat: string;
    long: string;
    locality: string;
    country: string;

    constructor(json: any) {
        this.lat = json.lat;
        this.long = json.long;
        this.locality = json.locality;
        this.country = json.country;
    }
}