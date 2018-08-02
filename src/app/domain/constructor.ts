export class Constructor {

    constructorId: string;
    url: string;
    name: string;
    nationality: string;

    constructor(json:any) {

        this.constructorId = json.constructorId;
        this.url = json.url;
        this.name = json.name;
        this.nationality = json.nationality;
    }
}