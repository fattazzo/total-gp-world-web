import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
export interface DataTableBuilder {
  buildColunms(mrData: MRData): Column[];

  buildData(mrData: MRData): any[];

  canHandleData(mrData: MRData): boolean;
}
