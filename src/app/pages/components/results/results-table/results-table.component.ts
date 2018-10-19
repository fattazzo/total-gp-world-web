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

  showRaceGroup: boolean = false;

  races$: Set<string> = new Set();
  drivers$: Set<string> = new Set();
  constructors$: Set<string> = new Set();

  cols: any[];

  @Input()
  season: string;

  constructor(private themeService: NbThemeService) { }

  ngOnInit() {
    this.buildColumns();
  }

  @Input('results')
  set results(results: Race[]) {
    this.racesResults = [];
    this.races$ = new Set();
    this.drivers$ = new Set();
    this.constructors$ = new Set();

    this.themeService.getJsTheme().subscribe(() => {
      results.forEach(race =>
        race.Results.forEach(result => {
          this.racesResults.push(new RaceResultsTable(race.raceName, race.Circuit, result));

          this.races$.add(race.raceName);
          this.drivers$.add(result.Driver.driverId);
          this.constructors$.add(result.Constructor.constructorId);
        })
      )
      this.showRaceGroup = this.races$.size > 1;

      this.buildColumns();
    });
  }

  private buildColumns() {
    this.cols = [];

    if (this.drivers$.size > 1) {
      this.cols.push({ field: 'driverName', key: 'driver.sing', cell: (race: RaceResultsTable) => `${race.driverName}` });
    }
    if (this.constructors$.size > 1) {
      this.cols.push({ field: 'constructorName', key: 'constructor.sing', cell: (race: RaceResultsTable) => `${race.constructorName}` });
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