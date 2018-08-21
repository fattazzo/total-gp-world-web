import { Component, OnInit, Input } from '@angular/core';
import { DriversService } from '../../../../services/drivers.service';
import { Observable, of, race } from 'rxjs';
import { Result } from '../../../../domain/result';
import { Race } from '../../../../domain/race';

@Component({
  selector: 'driver-results',
  templateUrl: './driver-results.component.html',
  styleUrls: ['./driver-results.component.scss']
})
export class DriverResultsComponent {

  private _driverId: string;
  private _season: string;

  public results: Observable<Race[]>;

  columns = [
    { columnDef: 'raceName', header: 'Race', cell: (race: Race) => `${race.raceName}` },
    { columnDef: 'position', header: 'Position', cell: (race: Race) => `${race.Results[0].positionText}` },
    { columnDef: 'laps', header: 'Laps', cell: (race: Race) => `${race.Results[0].laps}` },
    { columnDef: 'grid', header: 'Grid', cell: (race: Race) => `${race.Results[0].grid}` },
    { columnDef: 'time', header: 'Time', cell: (race: Race) => race.Results[0].Time === undefined ? '' : race.Results[0].Time.time },
    { columnDef: 'status', header: 'Status', cell: (race: Race) => `${race.Results[0].status}` },
    { columnDef: 'points', header: 'Points', cell: (race: Race) => `${race.Results[0].points}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private driversService: DriversService) { }

  @Input('season')
  set season(season: string) {
    this._season = season;
    this.loadResults();
  }

  @Input('driverId')
  set driverId(driverId: string) {
    this._driverId = driverId;
    this.loadResults();
  }

  private loadResults() {
    this.results = of();

    if (this._season != undefined && this._driverId != undefined) {
      this.results = this.driversService.getResults(this._season, this._driverId);
    }
  }

}
