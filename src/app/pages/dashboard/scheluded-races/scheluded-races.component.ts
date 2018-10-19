import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Configuration } from '../../../app.constants';
import { Race } from '../../../domain/race';
import { RacesService } from '../../../services/races.service';
import { SeasonsService } from '../../../services/seasons.service';
import { CardSettings } from '../card-settings';
import { DashboardCards } from '../dashboard-cards';

@Component({
  selector: 'scheluded-races',
  templateUrl: './scheluded-races.component.html',
})
export class ScheludedRacesComponent implements OnInit {
  @Input()
  season: string;

  schedule: Race[];

  racesCards: Observable<CardSettings[]>;

  constructor(
    private config: Configuration,
    private racesService: RacesService,
    private seasonsService: SeasonsService,
  ) {}

  ngOnInit() {
    if (this.season === undefined) this.season = this.config.season;
    this.loadStandings();

    this.seasonsService.getSeason().subscribe(newSeason => {
      this.season = newSeason;
      this.loadStandings();
    });

    this.racesCards = of(DashboardCards.racesCards);
  }

  private loadStandings() {
    this.schedule = [];
    this.updateRacesCards();
    this.racesService.getSchedule(this.season).subscribe(sc => {
      this.schedule = sc;
      this.updateRacesCards();
    });
  }

  private updateRacesCards() {
    let nrRaces = 0;
    const nationalities = new Set<string>();

    this.schedule.forEach(race$ => {
      nrRaces++;
      nationalities.add(race$.Circuit.Location.country);
    });

    DashboardCards.updateRacesCardsValues(nrRaces, nationalities.size);
  }
}
