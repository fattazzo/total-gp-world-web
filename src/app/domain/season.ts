export class Season {

    season: string;
    url: string;

    constructor(json:any) {

        this.season = json.season;
        this.url = json.url;
    }
}