import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConstructorsService } from '../../../services/constructors.service';
import { SeasonsService } from '../../../services/seasons.service';

import { ConstructorStanding } from '../../../domain/constructor-standing';

import { Configuration } from '../../../app.constants';

@Component({
  selector: 'constructor-standings',
  templateUrl: './constructor-standings.component.html'
})
export class ConstructorStandingsComponent implements OnInit {

  @Input() season: string;

  standings: ConstructorStanding[];

  constructor(private config: Configuration,
    private constructorsService: ConstructorsService,
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
    this.constructorsService.getStandings(this.season).subscribe(
      st => this.standings = st
    )
  }

}
