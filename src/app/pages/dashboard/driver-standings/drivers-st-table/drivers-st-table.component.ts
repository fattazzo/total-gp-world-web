import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DriversService } from '../../../../services/drivers.service';
import { SeasonsService } from '../../../../services/seasons.service';

import { DriverStanding } from '../../../../domain/driver-standing';
import { Configuration } from '../../../../app.constants';
import { StandingsTable } from '../../../../domain/tables/standings-table';

@Component({
  selector: 'drivers-st-table',
  templateUrl: './drivers-st-table.component.html',
  styleUrls: ['./drivers-st-table.component.scss']
})
export class DriversStTableComponent implements OnInit {

  @Input() standings: DriverStanding[];
  @Input() season: string;

  constructor(private driversService: DriversService) {
  }

  ngOnInit() {
  }
}
