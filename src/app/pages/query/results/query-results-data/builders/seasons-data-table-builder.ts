import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Season } from '../../../../../domain/season';

export class SeasonsDataTableBuilder implements DataTableBuilder {
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'season', labelKey: 'season.sing' },
      { key: 'info', labelKey: 'info.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const seasons: Season[] = mrData.SeasonTable.Seasons;

    return seasons.map(s => ({
      season: s.season,
      info: s.url,
    }));
  }
}
