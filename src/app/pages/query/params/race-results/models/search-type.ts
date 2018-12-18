export class SearchType {
  static readonly resultsSearchTypes = [
    { key: 'circuit-information', endPointName: 'circuits' },
    { key: 'constructor-information', endPointName: 'constructors' },
    { key: 'driver-information', endPointName: 'drivers' },
    { key: 'qualifying-results', endPointName: 'qualifying' },
    { key: 'race-results', endPointName: 'results' },
    { key: 'race-schedule', endPointName: 'races' },
    { key: 'season-list', endPointName: 'seasons' },
    { key: 'finishing-status', endPointName: 'status' },
  ];

  key: string;
  endPointName: string;

  public static getRsultsSearchTypes(): SearchType[] {
    return SearchType.resultsSearchTypes;
  }

  public static findByKey(key: string): SearchType {
    return SearchType.resultsSearchTypes.find(st => st.key === key);
  }
}
