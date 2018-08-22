import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../../domain/race';
import { DriversService } from '../../../../services/drivers.service';

@Component({
  selector: 'driver-qualifying',
  templateUrl: './driver-qualifying.component.html',
  styleUrls: ['./driver-qualifying.component.scss']
})
export class DriverQualifyingComponent {

  private _driverId: string;
  private _season: string;

  public results: Race[];

  revealed = false;

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

  toggleView() {
    this.revealed = !this.revealed;
  }

  private loadResults() {
    this.results = [];

    if (this._season != undefined && this._driverId != undefined) {
      this.driversService.getQualifying(this._season, this._driverId)
        .subscribe(res => {
          this.results = res
        });
    }
  }

}
