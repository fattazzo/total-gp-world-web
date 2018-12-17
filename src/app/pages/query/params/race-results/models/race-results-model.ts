export class RaceResultsModel {
  static readonly searchTypes: Type[] = [
    { key: 'circuit.information', endPointName: 'circuits' },
    { key: 'constructors.information', endPointName: 'constructors' },
    { key: 'drivers.information', endPointName: 'drivers' },
    { key: 'qualifying.results', endPointName: 'qualifying' },
    { key: 'race.results', endPointName: 'results' },
    { key: 'race.schedule', endPointName: 'races' },
    { key: 'season.list', endPointName: 'seasons' },
    { key: 'finishing.status', endPointName: 'status' },
  ];

  public type: Type = RaceResultsModel.searchTypes[0];
  public season: string = null;
  public round: string;
  public driverId: string;
  public constructorId: string;
  public finishingPosition: string;
  public grid: string;
  public fastestLapRank: string;
  public circuitId: string;
  public status: string;

  public resultPerPage: number = 30;
}

export interface Type {
  key: string;
  endPointName: string;
}
