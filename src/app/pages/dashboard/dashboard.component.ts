import { Component, OnInit } from '@angular/core';
import { Observable, of, race } from 'rxjs';

import { DashboardCards } from './dashboard-cards';
import { CardSettings } from './card-settings';

import { SeasonsService } from '../../services/seasons.service';
import { DriversService } from '../../services/drivers.service';
import { ConstructorsService } from '../../services/constructors.service';

import { DriverStanding } from '../../domain/driver-standing';
import { ConstructorStanding } from '../../domain/constructor-standing';
import { Race } from '../../domain/race';
import { RacesService } from '../../services/races.service';
import { Configuration } from '../../app.constants';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  driversCards: Observable<CardSettings[]>;
  constructorsCards: Observable<CardSettings[]>;
  racesCards: Observable<CardSettings[]>;

  season: string;

  constructor(private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private seasonsService: SeasonsService,
    private racesService: RacesService,
    private config: Configuration) { }

  ngOnInit() {
    this.season = this.config.season;
    this.driversCards = of(DashboardCards.driversCards);
    this.constructorsCards = of(DashboardCards.constructorsCards);
    this.racesCards = of(DashboardCards.racesCards);

    this.seasonsService.getSeason()
      .subscribe((newSeason) => {
        this.season = newSeason;
        this.driversService.getStandings(newSeason).subscribe(standings => this.updateDriversCards(standings));
        this.constructorsService.getStandings(newSeason).subscribe(standings => this.updateConstructorsCards(standings));
        this.racesService.getSchedule(newSeason).subscribe(schedule => this.updateRacesCards(schedule));
      });
  }

  private updateDriversCards(standings: DriverStanding[]) {
    var nrDrivers = 0;
    var totalPoins = 0;
    var winningDrivers = 0;
    var nationalities = new Set<string>();

    standings.forEach(ds => {
      nrDrivers++
      totalPoins = totalPoins + (+ds.points)
      if (ds.wins != "0") winningDrivers++;
      nationalities.add(ds.Driver.nationality)
    })

    DashboardCards.updateDriversCardsValues(nrDrivers, totalPoins, winningDrivers, nationalities.size);
  }

  private updateConstructorsCards(standings: ConstructorStanding[]) {
    var nrConstructors = 0;
    var totalPoins = 0;
    var winningConstructors = 0;
    var nationalities = new Set<string>();

    standings.forEach(ds => {
      nrConstructors++
      totalPoins = totalPoins + (+ds.points)
      if (ds.wins != "0") winningConstructors++;
      nationalities.add(ds.Constructor.nationality)
    })

    DashboardCards.updateConstructorsCardsValues(nrConstructors, totalPoins, winningConstructors, nationalities.size);
  }

  private updateRacesCards(races: Race[]) {
    var nrRaces = 0;
    var nationalities = new Set<string>();

    races.forEach(race => {
      nrRaces++
      nationalities.add(race.Circuit.Location.country)
    })

    DashboardCards.updateRacesCardsValues(nrRaces, nationalities.size);
  }

}
