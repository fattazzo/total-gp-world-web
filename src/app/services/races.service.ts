import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';
import { Race } from '../domain/race';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { of } from 'rxjs';
import { Lap } from '../domain/lap';
import { PitStop } from '../domain/pitstop';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private seasonCache$: string;

  private cacheSchedule$: Map<string, Race[]> = new Map();

  private cacheLaps$: Map<string, Lap[]> = new Map();
  private cachePitStops$: Map<string, PitStop[]> = new Map();

  constructor(private http: HttpClient, private config: Configuration) {}

  public getSchedule(season: string) {
    this.clearCacheIfNeeded(season);

    if (this.cacheSchedule$ && this.cacheSchedule$.has(season)) {
      return of(this.cacheSchedule$.get(season));
    }

    return this.loadSchedule(season);
  }

  public getLaps(season: string, round: string) {
    this.clearCacheIfNeeded(season);

    if (this.cacheLaps$ && this.cacheLaps$.has(round)) {
      return of(this.cacheLaps$.get(round));
    }

    return this.loadLaps(season, round);
  }

  public getPitStops(season: string, round: string) {
    this.clearCacheIfNeeded(season);

    if (this.cachePitStops$ && this.cachePitStops$.has(round)) {
      return of(this.cachePitStops$.get(round));
    }

    return this.loadPitStops(season, round);
  }

  private clearCacheIfNeeded(season: string) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheSchedule$.clear();
      this.cacheLaps$.clear();
      this.cachePitStops$.clear();
    }
  }

  private loadSchedule(season: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}.json`)
      .pipe(
        map(result => {
          const schedule =
            result.MRData.RaceTable.Races !== undefined
              ? result.MRData.RaceTable.Races
              : [];
          this.cacheSchedule$.set(season, schedule);
          this.seasonCache$ = season;
          return schedule;
        }),
      );
  }

  private loadLaps(season: string, round: string): Observable<Lap[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          this.config.ServerWithApiUrl
        }${season}/${round}/laps.json?limit=2000`,
      )
      .pipe(
        map(result => {
          const laps =
            result.MRData.RaceTable.Races[0].Laps !== undefined
              ? result.MRData.RaceTable.Races[0].Laps
              : [];
          this.cacheLaps$.set(round, laps);
          this.seasonCache$ = season;
          return laps;
        }),
      );
  }

  private loadPitStops(season: string, round: string): Observable<PitStop[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          this.config.ServerWithApiUrl
        }${season}/${round}/pitstops.json?limit=200`,
      )
      .pipe(
        map(result => {
          const pits =
            result.MRData.RaceTable.Races[0].PitStops !== undefined
              ? result.MRData.RaceTable.Races[0].PitStops
              : [];
          this.cachePitStops$.set(round, pits);
          this.seasonCache$ = season;
          return pits;
        }),
      );
  }
}
