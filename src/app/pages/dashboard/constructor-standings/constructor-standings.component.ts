import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../app.constants';
import { ConstructorStanding } from '../../../domain/constructor-standing';
import { ConstructorsService } from '../../../services/constructors.service';
import { SeasonsService } from '../../../services/seasons.service';
import { CardSettings } from '../card-settings';
import { DashboardCards } from '../dashboard-cards';

@Component({
  selector: 'constructor-standings',
  templateUrl: './constructor-standings.component.html',
})
export class ConstructorStandingsComponent implements OnInit {
  @Input() season: string;

  standings: ConstructorStanding[];

  constructorsCards: Observable<CardSettings[]>;

  constructor(
    private config: Configuration,
    private constructorsService: ConstructorsService,
    private seasonsService: SeasonsService,
  ) {}

  ngOnInit() {
    if (this.season === undefined) this.season = this.config.season;
    this.loadStandings();

    this.seasonsService.getSeason().subscribe(newSeason => {
      this.season = newSeason;
      this.loadStandings();
    });

    this.constructorsCards = of(DashboardCards.constructorsCards);
  }

  private loadStandings() {
    this.standings = undefined;
    this.updateConstructorsCards([]);
    this.constructorsService.getStandings(this.season).subscribe(st => {
      this.standings = st || [];
      this.updateConstructorsCards(this.standings);
    });
  }

  private updateConstructorsCards(standings: ConstructorStanding[]) {
    let nrConstructors = 0;
    let totalPoins = 0;
    let winningConstructors = 0;
    const nationalities = new Set<string>();

    standings.forEach(ds => {
      nrConstructors++;
      totalPoins = totalPoins + +ds.points;
      if (ds.wins !== '0') winningConstructors++;
      nationalities.add(ds.Constructor.nationality);
    });

    DashboardCards.updateConstructorsCardsValues(
      nrConstructors,
      totalPoins,
      winningConstructors,
      nationalities.size,
    );
  }
}
