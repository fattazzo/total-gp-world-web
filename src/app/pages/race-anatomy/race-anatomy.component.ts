import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { Race } from '../../domain/race';
import { RacesService } from '../../services/races.service';
import { Lap } from '../../domain/lap';
import { PitStop } from '../../domain/pitstop';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../domain/result';
import { QualifyingResult } from '../../domain/qualifying-result';
import { delay } from 'rxjs/operators';

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
  resultsSubscribe: any;
  qualifyingSubscribe: any;

  race: Race;
  laps: Lap[] = [];
  pits: PitStop[] = [];
  results: Result[] = [];
  qualifying: QualifyingResult[] = [];

  loadingLaps = false;
  loadingPits = false;
  loadingResults = false;
  loadingQualifying = false;

  constructor(
    private seasonsService: SeasonsService,
    private racesService: RacesService,
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
    this.results = [];
    this.qualifying = [];

    if (this.race !== null) {
      this.loadQualifying();

      this.loadResults();

      this.loadPits();
      this.loadLaps();
    }
  }

  private loadLaps() {
    this.loadingLaps = true;

    if (this.lapsSubscribe !== undefined) {
      this.lapsSubscribe.unsubscribe();
    }

    this.lapsSubscribe = this.racesService
      .getLaps(this.season, this.race.round)
      .subscribe(
        l => {
          this.laps = l;
          this.loadingLaps = false;
        },
        error => (this.loadingLaps = false),
      );
  }

  private loadPits() {
    this.loadingPits = true;

    if (this.pitsSubscribe !== undefined) {
      this.pitsSubscribe.unsubscribe();
    }

    this.pitsSubscribe = this.racesService
      .getPitStops(this.season, this.race.round)
      .subscribe(
        p => {
          this.pits = p;
          this.loadingPits = false;
        },
        error => (this.loadingPits = false),
      );
  }

  private loadResults() {
    this.loadingResults = true;

    if (this.resultsSubscribe !== undefined) {
      this.resultsSubscribe.unsubscribe();
    }

    this.resultsSubscribe = this.racesService
      .getResults(this.season, this.race.round)
      .subscribe(
        r => {
          this.results = r;
          this.loadingResults = false;
        },
        error => (this.loadingResults = false),
      );
  }

  private loadQualifying() {
    this.loadingQualifying = true;

    if (this.qualifyingSubscribe !== undefined) {
      this.qualifyingSubscribe.unsubscribe();
    }

    this.qualifyingSubscribe = this.racesService
      .getQualifying(this.season, this.race.round)
      .subscribe(
        q => {
          this.qualifying = q;
          this.loadingQualifying = false;
        },
        error => (this.loadingQualifying = false),
      );
  }
}
