import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Constructor } from '../../../../../domain/constructor';

export class ConstructorsDataTableBuilder implements DataTableBuilder {
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'name', labelKey: 'name.sing' },
      { key: 'nationality', labelKey: 'nationality.sing' },
      { key: 'info', labelKey: 'info.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const constructors: Constructor[] = mrData.ConstructorTable.Constructors;

    return constructors.map(c => ({
      name: c.name,
      nationality: c.nationality,
      info: c.url,
    }));
  }
}
