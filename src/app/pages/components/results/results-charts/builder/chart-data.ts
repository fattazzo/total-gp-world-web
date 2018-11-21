export class ChartData {

    public raceName: string;

    public driverName: string;
    public constructorName: string;

    public position: number;
    public points: number;
    public grid: number;

    constructor(race, result) {
        this.raceName = race.raceName;

        this.driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
        this.constructorName = result.Constructor.name;

        this.position = result.position;
        this.points = result.points;
        this.grid = result.grid;
    }
}