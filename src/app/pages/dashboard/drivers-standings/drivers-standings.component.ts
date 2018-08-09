import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DriversService } from '../../../services/drivers.service';
import { SeasonsService } from '../../../services/seasons.service';

import { DriverStanding } from '../../../domain/driver-standing';

import { Configuration } from '../../../app.constants';

@Component({
  selector: 'drivers-standings',
  templateUrl: './drivers-standings.component.html',
  styleUrls: ['./drivers-standings.component.scss']
})
export class DriversStandingsComponent implements OnInit {

  standings : Observable<DriverStanding[]>;

  constructor(private driversService: DriversService, private seasonsService: SeasonsService, private config: Configuration) { }

  ngOnInit() {
    this.seasonsService.getSeason().subscribe((newSeason) => {
      this.standings = this.driversService.getStandings(newSeason)
    });
  }
}
