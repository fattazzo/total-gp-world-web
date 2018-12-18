import { MRData } from '../../../../../domain/ergast/mrdata';
import { DataTableBuilder } from './data-table-builder';
import { DriversDataTableBuilder } from './drivers-data-table-builder';
export class DataTableBuilderFactory {
  public static getBuilder(mrData: MRData): DataTableBuilder {
    if (mrData.CircuitTable) {
      return null;
    }
    if (mrData.ConstructorTable) {
      return null;
    }
    if (mrData.DriverTable) {
      return new DriversDataTableBuilder();
    }
    if (mrData.RaceTable) {
      return null;
    }
    if (mrData.SeasonTable) {
      return null;
    }
    if (mrData.StandingsTable) {
      return null;
    }
    return null;
  }
}
