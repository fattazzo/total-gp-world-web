import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Race } from '../../../../../domain/race';

export class RacesDataTableBuilder implements DataTableBuilder {
  canHandleData(mrData: MRData): boolean {
    if (mrData.RaceTable) {
      const raceTbl = mrData.RaceTable;
      if (raceTbl.Races) {
        return true;
      }
    }
    return false;
  }
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'season', labelKey: 'season.sing' },
      { key: 'round', labelKey: 'round.sing' },
      { key: 'raceName', labelKey: 'race.sing' },
      { key: 'date', labelKey: 'date.sing' },
      { key: 'time', labelKey: 'hour.sing' },
      { key: 'circuit', labelKey: 'circuit.sing' },
      { key: 'locality', labelKey: 'locality.sing' },
      { key: 'country', labelKey: 'country.sing' },
      { key: 'info', labelKey: 'info.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const races: Race[] = mrData.RaceTable.Races;

    return races.map(r => ({
      season: r.season,
      round: r.round,
      raceName: r.raceName,
      date: r.date,
      time: r.time,
      circuit: r.Circuit.circuitName,
      locality: r.Circuit.Location.locality,
      country: r.Circuit.Location.country,
      info: r.url,
    }));
  }
}
