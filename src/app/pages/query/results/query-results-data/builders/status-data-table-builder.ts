import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Status } from '../../../../../domain/status';

export class StatusDataTableBuilder implements DataTableBuilder {
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'statusId', labelKey: 'status.id' },
      { key: 'status', labelKey: 'status.sing' },
      { key: 'count', labelKey: 'count.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const status: Status[] = mrData.StatusTable.Status;

    return status.map(s => ({
      statusId: s.statusId,
      status: s.status,
      count: s.count,
    }));
  }
}
