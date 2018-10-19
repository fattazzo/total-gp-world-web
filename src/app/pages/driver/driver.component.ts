import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { DriversService } from '../../services/drivers.service';
import { SeasonsService } from '../../services/seasons.service';

import { Driver } from '../../domain/driver';

@Component({
  selector: 'driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit, OnDestroy {

  driverIdSelected: string;
  season: string;

  drivers: Observable<Driver[]> = of();

  wikiUrl: string;

  seasonSubscribe: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private driversService: DriversService,
    private seasonsService: SeasonsService) { }

  ngOnDestroy() {
    this.seasonSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.season = params['season'];
      this.driverIdSelected = params['driverId'];

      if (this.season !== undefined) {
        this.drivers = this.driversService.get(this.season);
        this.wikiUrl = undefined;

        if (this.driverIdSelected !== undefined) {
          this.drivers.forEach(ds => {
            ds.forEach(d => {
              if (d.driverId === this.driverIdSelected) {
                this.wikiUrl = d.url;
              }
            })
          })
        }
      }
    });

    this.seasonSubscribe = this.seasonsService.getSeason().subscribe((newSeason) => {
      if (this.season !== newSeason) {
        this.season = newSeason;
        this.drivers = this.driversService.get(newSeason);
        this.onChange(this.driverIdSelected)
      }
    });
  }

  onChange(newValue) {
    this.router.navigate(['/pages/sections/driver', { season: this.season, driverId: newValue }]);
  }

}
