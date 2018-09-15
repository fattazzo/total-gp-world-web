import { Component, OnInit, Input } from '@angular/core';
import { Configuration } from '../../../app.constants';
import { DriversService } from '../../../services/drivers.service';
import { SeasonsService } from '../../../services/seasons.service';
import { DriverStanding } from '../../../domain/driver-standing';

@Component({
  selector: 'driver-standings',
  templateUrl: './driver-standings.component.html'
})
export class DriverStandingsComponent implements OnInit {

  @Input() season: string;

  standings: DriverStanding[];

  constructor(private config: Configuration,
    private driversService: DriversService,
    private seasonsService: SeasonsService) { }

  ngOnInit() {
    if (this.season === undefined) this.season = this.config.season;
    this.loadStandings();

    this.seasonsService.getSeason()
      .subscribe((newSeason) => {
        this.season = newSeason;
        this.loadStandings();
      });
  }

  private loadStandings() {
    this.standings = [];
    this.driversService.getStandings(this.season).subscribe(
      st => this.standings = st
    )
  }

}
