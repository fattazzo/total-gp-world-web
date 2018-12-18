import { SearchType } from './search-type';

export class RaceResultsModel {
  public type: string = null;
  public season: string = null;
  public round: string = null;
  public driverId: string = null;
  public constructorId: string = null;
  public finishingPosition: string = null;
  public grid: string = null;
  public fastestLapRank: string = null;
  public circuitId: string = null;
  public statusId: string = null;

  public resultPerPage: number = null;

  constructor() {
    this.type = SearchType.getRsultsSearchTypes()[0].key;
    this.resultPerPage = 20;
  }
}
