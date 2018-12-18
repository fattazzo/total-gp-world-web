import { Component, OnInit, Input } from '@angular/core';
import { MRData } from '../../../../domain/ergast/mrdata';
import { BaseTable } from '../../../../domain/tables/base-table';

@Component({
  selector: 'query-results-info',
  templateUrl: './query-results-info.component.html',
  styleUrls: ['./query-results-info.component.scss'],
})
export class QueryResultsInfoComponent implements OnInit {
  columns: string[];
  data: any[];
  values: any[];

  constructor() {}

  ngOnInit() {}

  @Input('mrData')
  set info(value: MRData) {
    this.data = [];
    this.values = [];
    this.columns = [];

    if (value) {
      this.columns.push('page.plur');
      this.data.push(Math.ceil(value.total / value.limit));

      this.columns.push('result.plur');
      this.data.push(value.total);

      const table: BaseTable = this.getCurrentTable(value);
      if (table) {
        if (table.season) {
          this.columns.push('season.sing');
          this.data.push(table.season);
        }
        if (table.round) {
          this.columns.push('round.sing');
          this.data.push(table.round);
        }
        if (table.driverId) {
          this.columns.push('driver.id');
          this.data.push(table.driverId);
        }
        if (table.constructorId) {
          this.columns.push('constructor.id');
          this.data.push(table.constructorId);
        }
        if (table.circuitId) {
          this.columns.push('circuit.id');
          this.data.push(table.circuitId);
        }
        if (table.grid) {
          this.columns.push('grid.sing');
          this.data.push(table.grid);
        }
        if (table.position) {
          this.columns.push('position.sing');
          this.data.push(table.position);
        }
        if (table.statusId) {
          this.columns.push('status.id');
          this.data.push(table.statusId);
        }
      }

      this.values.push('ok');
    }
  }

  private getCurrentTable(mrData: MRData): BaseTable {
    if (mrData.CircuitTable) {
      return mrData.CircuitTable;
    }

    if (mrData.ConstructorTable) {
      return mrData.ConstructorTable;
    }

    if (mrData.DriverTable) {
      return mrData.DriverTable;
    }

    if (mrData.RaceTable) {
      return mrData.RaceTable;
    }

    if (mrData.SeasonTable) {
      return mrData.SeasonTable;
    }

    if (mrData.StandingsTable) {
      return mrData.StandingsTable;
    }

    return null;
  }
}
