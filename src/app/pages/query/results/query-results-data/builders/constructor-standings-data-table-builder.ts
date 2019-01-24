import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { StandingsLists } from '../../../../../domain/tables/standings-table';

export class ConstructorStandingsDataTableBuilder implements DataTableBuilder {
  canHandleData(mrData: MRData): boolean {
    if (mrData.StandingsTable) {
      if (mrData.StandingsTable.StandingsLists[0].ConstructorStandings) {
        return true;
      }
    }
    return false;
  }
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'position', labelKey: 'position.sing' },
      { key: 'constructor', labelKey: 'constructor.sing' },
      { key: 'nationality', labelKey: 'nationality.plur' },
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
      sl.ConstructorStandings.forEach(ds => {
        data.push({
          position: ds.positionText,
          constructor: ds.Constructor.name,
          nationality: ds.Constructor.nationality,
          points: ds.points,
          wins: ds.wins,
        });
      });
    });
    return data;
  }
}
