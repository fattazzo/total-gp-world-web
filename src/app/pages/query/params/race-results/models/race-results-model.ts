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

  private type: Type = RaceResultsModel.searchTypes[0];
  private season: string = null;
  private round: string;
  private driverId: string;
  private constructorId: string;
  private finishingPosition: string;
  private grid: string;
  private fastestLapRank: string;
  private circuitId: string;
  private status: string;

  private resultPerPage: number = 30;
}

export interface Type {
  key: string;
  endPointName: string;
}
