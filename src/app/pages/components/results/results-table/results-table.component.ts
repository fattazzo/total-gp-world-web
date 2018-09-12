import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../../domain/race';
import { RaceResultsTable } from './domain/race-results-table';

@Component({
  selector: 'results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  racesResults: RaceResultsTable[];
  multipleResults: boolean = false;

  cols: any[];

  constructor() { }

  ngOnInit() {
    this.buildColumns();
  }

  @Input('results')
  set results(results: Race[]) {
    this.racesResults = [];
    this.multipleResults = false

    results.forEach(race =>
      race.Results.forEach((result, index) => {
        this.racesResults.push(new RaceResultsTable(race.raceName, race.Circuit, result));
        this.multipleResults = this.multipleResults || (index > 0);
      })
    )

    this.buildColumns();
  }

  private buildColumns() {
    this.cols = [];

    if (this.multipleResults) {
      this.cols.push({ field: 'driverName', header: 'Driver', cell: (race: RaceResultsTable) => `${race.driverName}` });
    }

    this.cols.push(
      { field: 'grid', header: 'Grid', cell: (race: RaceResultsTable) => `${race.result.grid}` },
      { field: 'position', header: 'Position', cell: (race: RaceResultsTable) => `${race.result.positionText}` },
      { field: 'points', header: 'Points', cell: (race: RaceResultsTable) => `${race.result.points}` },
      { field: 'status', header: 'Status', cell: (race: RaceResultsTable) => `${race.result.status}` },
      { field: 'laps', header: 'Laps', cell: (race: RaceResultsTable) => `${race.result.laps}` },
      { field: 'time', header: 'Time', cell: (race: RaceResultsTable) => `${race.time}` }
    );
  }
}