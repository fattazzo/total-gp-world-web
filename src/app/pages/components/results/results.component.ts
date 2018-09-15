import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../domain/race';
import { DriversService } from '../../../services/drivers.service';
import { ConstructorsService } from '../../../services/constructors.service';

@Component({
  selector: 'f1-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  private _driverId: string;
  private _constructorId: string;
  private _season: string;

  public results: Race[];

  revealed = false;

  type: string = 'Points';

  constructor(private driversService: DriversService, private constructorService: ConstructorsService) { }

  @Input('season')
  set season(season: string) {
    this._season = season;
    this.loadResults();
  }

  @Input('driverId')
  set driverId(driverId: string) {
    this._driverId = driverId;
    this._constructorId = undefined;
    this.loadResults();
  }

  @Input('constructorId')
  set constructorId(constructorId: string) {
    this._constructorId = constructorId;
    this._driverId = undefined;
    this.loadResults();
  }

  setType(type: string): void {
    this.type = type;
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  private loadResults() {
    this.results = [];

    if (this._season === undefined) {
      return;
    }

    if (this._driverId != undefined) {
      this.driversService.getResults(this._season, this._driverId)
        .subscribe(res => {
          this.results = res
        });
    } else if (this._constructorId != undefined) {
      this.constructorService.getResults(this._season, this._constructorId)
        .subscribe(res => {
          this.results = res
        });
    }
  }

}
