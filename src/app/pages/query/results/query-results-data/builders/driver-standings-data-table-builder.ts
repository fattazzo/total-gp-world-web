import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Driver } from '../../../../../domain/driver';
import { Column } from '../models/column';
import { DriverStanding } from '../../../../../domain/driver-standing';
import { StandingsLists } from '../../../../../domain/tables/standings-table';

export class DriverStandingsDataTableBuilder implements DataTableBuilder {
  canHandleData(mrData: MRData): boolean {
    if (mrData.StandingsTable) {
      if (mrData.StandingsTable.StandingsLists[0].DriverStandings) {
        return true;
      }
    }
    return false;
  }
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'position', labelKey: 'position.sing' },
      { key: 'driver', labelKey: 'driver.sing' },
      { key: 'constructor', labelKey: 'constructor.sing' },
      { key: 'points', labelKey: 'point.plur' },
      { key: 'wins', labelKey: 'win.plur' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const standingsLists: StandingsLists[] =
      mrData.StandingsTable.StandingsLists;

    const data = [];
    standingsLists.forEach(sl => {
      // season
      data.push({ value: sl.season });
      // standings
      sl.DriverStandings.forEach(ds => {
        data.push({
          position: ds.positionText,
          driver: `${ds.Driver.givenName} ${ds.Driver.familyName}`,
          constructor: ds.Constructors[0].name,
          points: ds.points,
          wins: ds.wins,
        });
      });
    });
    return data;
  }
}
