export class SearchType {
  static readonly KEY_DRIVER_STANDINGS = 'driver-standings';
  static readonly KEY_DRIVER_INFORMATION = 'driver-information';

  static readonly KEY_CONSTRUCTOR_STANDINGS = 'constructor-standings';
  static readonly KEY_CONSTRUCTOR_INFORMATION = 'constructor-information';

  static readonly resultsSearchTypes = [
    { key: SearchType.KEY_DRIVER_STANDINGS, endPointName: 'driverStandings' },
    {
      key: SearchType.KEY_CONSTRUCTOR_STANDINGS,
      endPointName: 'constructorStandings',
    },
    { key: SearchType.KEY_DRIVER_INFORMATION, endPointName: 'drivers' },
    {
      key: SearchType.KEY_CONSTRUCTOR_INFORMATION,
      endPointName: 'constructors',
    },
    { key: 'season-list', endPointName: 'seasons' },
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
