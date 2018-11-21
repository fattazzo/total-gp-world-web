import { Component, OnInit, Input } from '@angular/core';
import { Configuration } from '../../../app.constants';
import { DriversService } from '../../../services/drivers.service';
import { SeasonsService } from '../../../services/seasons.service';
import { DriverStanding } from '../../../domain/driver-standing';
import { Observable } from 'rxjs/Observable';
import { CardSettings } from '../card-settings';
import { of } from 'rxjs';
import { DashboardCards } from '../dashboard-cards';

@Component({
  selector: 'driver-standings',
  templateUrl: './driver-standings.component.html',
})
export class DriverStandingsComponent implements OnInit {
  @Input()
  season: string;

  standings: DriverStanding[];

  driversCards: Observable<CardSettings[]>;

  constructor(
    private config: Configuration,
    private driversService: DriversService,
    private seasonsService: SeasonsService,
  ) {}

  ngOnInit() {
    if (this.season === undefined) this.season = this.config.season;
    this.loadStandings();

    this.seasonsService.getSeason().subscribe(newSeason => {
      this.season = newSeason;
      this.loadStandings();
    });

    this.driversCards = of(DashboardCards.driversCards);
  }

  private loadStandings() {
    this.standings = undefined;
    this.updateDriversCards([]);
    this.driversService.getStandings(this.season).subscribe(st => {
      this.standings = st || [];
      this.updateDriversCards(this.standings);
    });
  }

  private updateDriversCards(standings: DriverStanding[]) {
    let nrDrivers = 0;
    let totalPoins = 0;
    let winningDrivers = 0;
    const nationalities = new Set<string>();

    standings.forEach(ds => {
      nrDrivers++;
      totalPoins = totalPoins + +ds.points;
      if (ds.wins !== '0') winningDrivers++;
      nationalities.add(ds.Driver.nationality);
    });

    DashboardCards.updateDriversCardsValues(
      nrDrivers,
      totalPoins,
      winningDrivers,
      nationalities.size,
    );
  }
}
