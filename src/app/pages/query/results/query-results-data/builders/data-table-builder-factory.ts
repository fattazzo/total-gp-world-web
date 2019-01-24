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
import { DriverStandingsDataTableBuilder } from './driver-standings-data-table-builder';
import { ConstructorStandingsDataTableBuilder } from './constructor-standings-data-table-builder';
export class DataTableBuilderFactory {
  public static builders: DataTableBuilder[] = [
    new CircuitsDataTableBuilder(),
    new ConstructorsDataTableBuilder(),
    new DriversDataTableBuilder(),
    new QualifyingDataTableBuilder(),
    new ResultsDataTableBuilder(),
    new RacesDataTableBuilder(),
    new SeasonsDataTableBuilder(),
    new StatusDataTableBuilder(),
    new DriverStandingsDataTableBuilder(),
    new ConstructorStandingsDataTableBuilder(),
  ];

  public static getBuilder(mrData: MRData): DataTableBuilder {
    let dataBuilder: DataTableBuilder = null;

    this.builders.every(builder => {
      if (builder.canHandleData(mrData)) {
        dataBuilder = builder;
        return false;
      }
      return true;
    });

    return dataBuilder;
  }
}
