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

  public results: Race[];

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
    this.results = [];

    if (this._season != undefined && this._driverId != undefined) {
      this.driversService.getResults(this._season, this._driverId)
        .subscribe(res => {
          this.results = res
        });
    }
  }

}
