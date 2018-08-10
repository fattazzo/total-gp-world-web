import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DriversService } from '../../../services/drivers.service';
import { SeasonsService } from '../../../services/seasons.service';

import { Driver } from '../../../domain/driver';

@Component({
  selector: 'driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  @Input() driverSelected: string;

  drivers: Observable<Driver[]>;

  constructor(private route: ActivatedRoute,
    private driversService: DriversService,
    private seasonsService: SeasonsService) { }

  ngOnInit() {
    this.driverSelected = this.route.snapshot.paramMap.get('driverId')
    this.seasonsService.getSeason().subscribe((newSeason) => {
      this.drivers = this.driversService.get(newSeason)
    });
  }

}
