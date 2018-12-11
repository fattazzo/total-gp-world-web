import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Race } from '../domain/race';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { of } from 'rxjs';
import { Lap } from '../domain/lap';
import { PitStop } from '../domain/pitstop';
import { environment } from '../../environments/environment';
import { Result } from '../domain/result';
import { QualifyingResult } from '../domain/qualifying-result';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private seasonCache$: string;

  private cacheSchedule$: Map<string, Race[]> = new Map();

  private cacheLaps$: Map<string, Lap[]> = new Map();
  private cachePitStops$: Map<string, PitStop[]> = new Map();
  private cacheResults$: Map<string, Result[]> = new Map();
  private cacheQualifying$: Map<string, QualifyingResult[]> = new Map();

  constructor(private http: HttpClient) {}

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

  public getResults(season: string, round: string) {
    this.clearCacheIfNeeded(season);

    if (this.cacheResults$ && this.cacheResults$.has(round)) {
      return of(this.cacheResults$.get(round));
    }

    return this.loadResults(season, round);
  }

  public getQualifying(season: string, round: string) {
    this.clearCacheIfNeeded(season);

    if (this.cacheQualifying$ && this.cacheQualifying$.has(round)) {
      return of(this.cacheQualifying$.get(round));
    }

    return this.loadQualifying(season, round);
  }

  private clearCacheIfNeeded(season: string) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheSchedule$.clear();
      this.cacheLaps$.clear();
      this.cachePitStops$.clear();
      this.cacheResults$.clear();
      this.cacheQualifying$.clear();
    }
  }

  private loadSchedule(season: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(`${environment.ergastApiUrl}${season}.json`)
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
        `${environment.ergastApiUrl}${season}/${round}/laps.json?limit=2000`,
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
        `${environment.ergastApiUrl}${season}/${round}/pitstops.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
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

  private loadResults(season: string, round: string): Observable<Result[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}${season}/${round}/results.json`,
      )
      .pipe(
        map(result => {
          const results =
            result.MRData.RaceTable.Races[0].Results !== undefined
              ? result.MRData.RaceTable.Races[0].Results
              : [];
          this.cacheResults$.set(round, results);
          this.seasonCache$ = season;
          return results;
        }),
      );
  }

  private loadQualifying(
    season: string,
    round: string,
  ): Observable<QualifyingResult[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}${season}/${round}/qualifying.json`,
      )
      .pipe(
        map(result => {
          const qualifying =
            result.MRData.RaceTable.Races[0].QualifyingResults !== undefined
              ? result.MRData.RaceTable.Races[0].QualifyingResults
              : [];
          this.cacheQualifying$.set(round, qualifying);
          this.seasonCache$ = season;
          return qualifying;
        }),
      );
  }
}
