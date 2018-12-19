import { DataTableBuilder } from './data-table-builder';
import { MRData } from '../../../../../domain/ergast/mrdata';
import { Column } from '../models/column';
import { Circuit } from '../../../../../domain/circuit';

export class CircuitsDataTableBuilder implements DataTableBuilder {
  public buildColunms(mrData: MRData): Column[] {
    return [
      { key: 'circuitName', labelKey: 'circuit.sing' },
      { key: 'locality', labelKey: 'locality.sing' },
      { key: 'country', labelKey: 'country.sing' },
      { key: 'info', labelKey: 'info.sing' },
    ];
  }
  public buildData(mrData: MRData): any[] {
    const circuits: Circuit[] = mrData.CircuitTable.Circuits;

    return circuits.map(c => ({
      circuitName: c.circuitName,
      locality: c.Location.locality,
      country: c.Location.country,
      info: c.url,
    }));
  }
}
