import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DriversService } from '../../../services/drivers.service';
import { SeasonsService } from '../../../services/seasons.service';

import { Driver } from '../../../domain/driver';
import { WikipediaPage } from '../../../domain/wikipedia-page';

@Component({
  selector: 'driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  @Input() driverIdSelected: string;

  drivers: Observable<Driver[]> = of();

  wikiPage: WikipediaPage;

  constructor(private route: ActivatedRoute,
    private driversService: DriversService,
    private seasonsService: SeasonsService) { }

  ngOnInit() {
    this.driverIdSelected = this.route.snapshot.paramMap.get('driverId')
    this.onChange(this.driverIdSelected);

    this.seasonsService.getSeason().subscribe((newSeason) => {
      this.drivers = this.driversService.get(newSeason);
      this.onChange(this.driverIdSelected)
    });
  }

  onChange(newValue) {
    this.wikiPage = undefined;

    this.drivers.forEach(ds => {
      ds.forEach(d => {
        if (d.driverId === newValue) {
          this.driverIdSelected = newValue;

          this.driversService.getInfo(d)
            .subscribe(
              info => this.wikiPage = info,
              error => this.wikiPage = undefined);
        }
      })
    })
  }

}
