import { SearchType } from './search-type';

export class StandingsModel {
  public type: string = null;
  public season: string = null;
  public round: string = null;
  public driverStandings: string = null;
  public driverId: string = null;
  public constructorStandings: string = null;
  public constructorId: string = null;
  public resultPerPage: number = null;

  constructor() {
    this.type = SearchType.getRsultsSearchTypes()[0].key;
    this.resultPerPage = 20;
  }
}
