export class MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;

    constructor(json:any) {
        this.xmlns = json.xmlns;
        this.series = json.series;
        this.url = json.url;
        this.limit = json.limit;
        this.offset = json.offset;
        this.total = json.total;
    }

    public toString() : string {
        return `MRData (xmlns: ${this.xmlns}, series: ${this.series}, url: ${this.url}, limit: ${this.limit}, offset: ${this.offset}, total: ${this.total})`;
    } 
}