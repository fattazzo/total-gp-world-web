import { MRData } from '../../../../../domain/ergast/mrdata';
import { DataTableBuilder } from './data-table-builder';
import { DriversDataTableBuilder } from './drivers-data-table-builder';
import { CircuitsDataTableBuilder } from './circuits-data-table-builder';
import { ConstructorsDataTableBuilder } from './constructors-data-table-builder';
import { RacesDataTableBuilder } from './races-data-table-builder';
import { QualifyingDataTableBuilder } from './qualifying-data-table-builder';
import { ResultsDataTableBuilder } from './results-data-table-builder';
import { SeasonsDataTableBuilder } from './seasons-data-table-builder';
import { StatusDataTableBuilder } from './status-data-table-builder';
export class DataTableBuilderFactory {
  public static getBuilder(mrData: MRData): DataTableBuilder {
    if (mrData.CircuitTable) {
      return new CircuitsDataTableBuilder();
    }
    if (mrData.ConstructorTable) {
      return new ConstructorsDataTableBuilder();
    }
    if (mrData.DriverTable) {
      return new DriversDataTableBuilder();
    }
    if (mrData.RaceTable) {
      const raceTbl = mrData.RaceTable;
      if (raceTbl.Races && raceTbl.Races[0].QualifyingResults) {
        return new QualifyingDataTableBuilder();
      }
      if (raceTbl.Races && raceTbl.Races[0].Results) {
        return new ResultsDataTableBuilder();
      }
      if (raceTbl.Races) {
        return new RacesDataTableBuilder();
      }
      return null;
    }
    if (mrData.SeasonTable) {
      return new SeasonsDataTableBuilder();
    }
    if (mrData.StatusTable) {
      return new StatusDataTableBuilder();
    }
    return null;
  }
}
