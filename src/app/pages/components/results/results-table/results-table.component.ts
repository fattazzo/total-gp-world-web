import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Race } from '../../../../domain/race';
import { RaceResultsTable } from './domain/race-results-table';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  racesResults: RaceResultsTable[];
  multipleResults: boolean = false;

  cols: any[];

  constructor(private themeService: NbThemeService) { }

  ngOnInit() {
    this.buildColumns();
  }

  @Input('results')
  set results(results: Race[]) {
    this.racesResults = [];
    this.multipleResults = false

    this.themeService.getJsTheme().subscribe(config => {
      results.forEach(race =>
        race.Results.forEach((result, index) => {
          this.racesResults.push(new RaceResultsTable(race.raceName, race.Circuit, result));
          this.multipleResults = this.multipleResults || (index > 0);
        })
      )

      this.buildColumns();
    });
  }

  private buildColumns() {
    this.cols = [];

    if (this.multipleResults) {
      this.cols.push({ field: 'driverName', key: 'driver.sing', cell: (race: RaceResultsTable) => `${race.driverName}` });
    }

    this.cols.push(
      { field: 'grid', key: 'grid.sing', cell: (race: RaceResultsTable) => `${race.result.grid}` },
      { field: 'position', key: 'position.sing', cell: (race: RaceResultsTable) => `${race.result.positionText}` },
      { field: 'points', key: 'point.plur', cell: (race: RaceResultsTable) => `${race.result.points}` },
      { field: 'status', key: 'status.sing', cell: (race: RaceResultsTable) => `${race.result.status}` },
      { field: 'laps', key: 'lap.plur', cell: (race: RaceResultsTable) => `${race.result.laps}` },
      { field: 'time', key: 'time.sing', cell: (race: RaceResultsTable) => `${race.time}` }
    );
  }
}