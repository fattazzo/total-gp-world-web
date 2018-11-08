import { Component, OnInit, Input } from '@angular/core';
import { DriversService } from '../../../services/drivers.service';
import { Season } from '../../../domain/season';
import { ConstructorsService } from '../../../services/constructors.service';
import { SeasonsService } from '../../../services/seasons.service';
import { Router } from '@angular/router';
import { CircuitsService } from '../../../services/circuits.service';

@Component({
  selector: 'f1-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];

  cols: any[];

  constructor(
    private driverService: DriversService,
    private constructorService: ConstructorsService,
    private circuitsService: CircuitsService,
    private seasonsService: SeasonsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cols = [
      {
        field: 'season',
        key: 'season.sing',
        cell: (season: Season) => `${season.season}`,
      },
    ];
  }

  @Input('driverId')
  set driverId(value: string) {
    this.seasons = [];

    if (value && value !== 'undefined') {
      this.driverService
        .getSeasons(value)
        .subscribe(results => (this.seasons = results.reverse()));
    }
  }

  @Input('constructorId')
  set constructorId(value: string) {
    this.seasons = [];

    if (value && value !== 'undefined') {
      this.constructorService
        .getSeasons(value)
        .subscribe(results => (this.seasons = results.reverse()));
    }
  }

  @Input('circuitId')
  set circuitId(value: string) {
    this.seasons = [];

    if (value && value !== 'undefined') {
      this.circuitsService
        .getSeasons(value)
        .subscribe(results => (this.seasons = results.reverse()));
    }
  }

  public changeSeasons(season: string) {
    this.seasonsService.setSeason(season);
    this.router.navigate(['/pages/dashboard']);
  }
}
