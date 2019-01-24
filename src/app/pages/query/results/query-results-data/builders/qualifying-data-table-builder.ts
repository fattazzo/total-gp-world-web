import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { QualifyingResult } from '../../../../../domain/qualifying-result';
import { Race } from '../../../../../domain/race';

export class QualifyingDataTableBuilder implements DataTableBuilder {
  canHandleData(mrData: MRData): boolean {
    if (mrData.RaceTable) {
      const raceTbl = mrData.RaceTable;
      if (raceTbl.Races && raceTbl.Races[0].QualifyingResults) {
        return true;
      }
    }

    return false;
  }
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'position', labelKey: 'position.sing' },
      { key: 'number', labelKey: 'number.sing' },
      { key: 'driver', labelKey: 'driver.sing' },
      { key: 'constructor', labelKey: 'constructor.sing' },
      { key: 'q1', labelKey: 'Q1' },
      { key: 'q2', labelKey: 'Q2' },
      { key: 'q3', labelKey: 'Q3' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const races: Race[] = mrData.RaceTable.Races;

    const data = [];
    races.forEach(race => {
      // race name
      data.push({ value: race.raceName });
      // qualifying results
      race.QualifyingResults.forEach(q => {
        data.push({
          position: q.position,
          number: q.number,
          driver: `${q.Driver.givenName} ${q.Driver.familyName}`,
          constructor: q.Constructor.name,
          q1: q.Q1,
          q2: q.Q2,
          q3: q.Q3,
        });
      });
    });
    return data;
  }
}
