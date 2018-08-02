export class Driver {

    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;

    constructor(json:any) {

        this.driverId = json.driverId;
        this.permanentNumber = json.permanentNumber;
        this.code = json.code;
        this.url = json.url;
        this.givenName = json.givenName;
        this.familyName = json.familyName;
        this.dateOfBirth = json.dateOfBirth;
        this.nationality = json.nationality;
    }
}