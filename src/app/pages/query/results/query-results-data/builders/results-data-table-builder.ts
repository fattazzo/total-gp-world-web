import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Race } from '../../../../../domain/race';

export class ResultsDataTableBuilder implements DataTableBuilder {
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'position', labelKey: 'position.sing' },
      { key: 'number', labelKey: 'number.sing' },
      { key: 'driver', labelKey: 'driver.sing' },
      { key: 'constructor', labelKey: 'constructor.sing' },
      { key: 'laps', labelKey: 'lap.sing' },
      { key: 'grid', labelKey: 'grid.sing' },
      { key: 'time', labelKey: 'hour.sing' },
      { key: 'status', labelKey: 'status.sing' },
      { key: 'points', labelKey: 'point.plur' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const races: Race[] = mrData.RaceTable.Races;

    const data = [];
    races.forEach(race => {
      // race name
      data.push({ value: race.raceName });
      // results
      race.Results.forEach(r => {
        data.push({
          position: r.positionText,
          number: r.number,
          driver: `${r.Driver.givenName} ${r.Driver.familyName}`,
          constructor: r.Constructor.name,
          laps: r.laps,
          grid: r.grid,
          time: r.Time ? r.Time.time : '',
          status: r.status,
          points: r.points,
        });
      });
    });
    return data;
  }
}
