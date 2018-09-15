import { Component, OnInit, Input } from '@angular/core';
import { Race } from '../../../domain/race';
import { DriversService } from '../../../services/drivers.service';
import { ConstructorsService } from '../../../services/constructors.service';

@Component({
  selector: 'f1-qualifying',
  templateUrl: './qualifying.component.html',
  styleUrls: ['./qualifying.component.scss']
})
export class QualifyngComponent {

  private _driverId: string;
  private _constructorId: string;
  private _season: string;

  public results: Race[];

  revealed = false;

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

  toggleView() {
    this.revealed = !this.revealed;
  }

  private loadResults() {
    this.results = [];

    if (this._season === undefined) {
      return;
    }

    if (this._driverId != undefined) {
      this.driversService.getQualifying(this._season, this._driverId)
        .subscribe(res => {
          this.results = res
        });
    } else if (this._constructorId != undefined) {
      this.constructorService.getQualifying(this._season, this._constructorId)
        .subscribe(res => {
          this.results = res
        });
    }
  }

}