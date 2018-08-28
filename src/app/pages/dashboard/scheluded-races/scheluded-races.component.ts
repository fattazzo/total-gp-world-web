import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../../../domain/race';
import { RacesService } from '../../../services/races.service';
import { SeasonsService } from '../../../services/seasons.service';
import { Configuration } from '../../../app.constants';

@Component({
  selector: 'scheluded-races',
  templateUrl: './scheluded-races.component.html'
})
export class ScheludedRacesComponent implements OnInit {

  @Input() season: string;

  schedule: Race[];

  constructor(private config: Configuration,
    private racesService: RacesService,
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
    this.schedule = [];
    this.racesService.getSchedule(this.season).subscribe(
      sc => this.schedule = sc
    )
  }

}
