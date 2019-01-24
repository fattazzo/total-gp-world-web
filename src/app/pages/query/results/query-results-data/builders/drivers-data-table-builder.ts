import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Driver } from '../../../../../domain/driver';
import { Column } from '../models/column';

export class DriversDataTableBuilder implements DataTableBuilder {
  canHandleData(mrData: MRData): boolean {
    return !!mrData.DriverTable;
  }
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'driver', labelKey: 'driver.sing' },
      { key: 'permanentNumber', labelKey: 'number.sing' },
      { key: 'code', labelKey: 'code.sing' },
      { key: 'dateOfBirth', labelKey: 'date.of-bird' },
      { key: 'nationality', labelKey: 'nationality.sing' },
      { key: 'info', labelKey: 'info.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const drivers: Driver[] = mrData.DriverTable.Drivers;

    return drivers.map(d => ({
      driver: `${d.givenName} ${d.familyName}`,
      permanentNumber: d.permanentNumber,
      code: d.code,
      dateOfBirth: d.dateOfBirth,
      nationality: d.nationality,
      info: d.url,
    }));
  }
}
