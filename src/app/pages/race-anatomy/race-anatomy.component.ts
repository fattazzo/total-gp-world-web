import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { Race } from '../../domain/race';
import { RacesService } from '../../services/races.service';
import { Lap } from '../../domain/lap';
import { PitStop } from '../../domain/pitstop';
import { HttpClient } from '@angular/common/http';
import { ErgastResponse } from '../../domain/ergast/ergast-response';

@Component({
  selector: 'race-anatomy',
  templateUrl: './race-anatomy.component.html',
  styleUrls: ['./race-anatomy.component.scss'],
})
export class RaceAnatomyComponent implements OnInit, OnDestroy {
  season: string;

  seasonSubscribe: any;
  lapsSubscribe: any;
  pitsSubscribe: any;

  race: Race;
  laps: Lap[] = [];
  pits: PitStop[] = [];

  loadingLaps = false;
  loadingPits = false;

  constructor(
    private seasonsService: SeasonsService,
    private racesService: RacesService,
    private http: HttpClient,
  ) {}

  ngOnDestroy() {
    this.seasonSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.seasonSubscribe = this.seasonsService
      .getSeason()
      .subscribe(newSeason => {
        if (this.season !== newSeason) {
          this.season = newSeason;
        }
      });
  }

  onRaceChange(value: Race) {
    this.race = value;

    this.laps = [];
    this.pits = [];

    this.loadLaps();
    this.loadPits();

    // this.http
    //  .get<ErgastResponse>('./assets/pits.json')
    //  .subscribe(l => (this.pits = l.MRData.RaceTable.Races[0].PitStops));

    // this.http
    //  .get<ErgastResponse>('./assets/laps.json')
    //  .subscribe(l => (this.laps = l.MRData.RaceTable.Races[0].Laps));
  }

  private loadLaps() {
    this.loadingLaps = true;

    if (this.lapsSubscribe !== undefined) {
      this.lapsSubscribe.unsubscribe();
    }

    this.lapsSubscribe = this.racesService
      .getLaps(this.season, this.race.round)
      .subscribe(l => {
        this.laps = l;
        this.loadingLaps = false;
      });
  }

  private loadPits() {
    this.loadingPits = true;

    if (this.pitsSubscribe !== undefined) {
      this.pitsSubscribe.unsubscribe();
    }

    this.pitsSubscribe = this.racesService
      .getPitStops(this.season, this.race.round)
      .subscribe(p => {
        this.pits = p;
        this.loadingPits = false;
      });
  }
}
