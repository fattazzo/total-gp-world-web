import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { ConstructorStanding } from '../domain/constructor-standing';
import { Constructor } from '../domain/constructor';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { Race } from '../domain/race';
import { Season } from '../domain/season';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConstructorsService {
  private seasonCache$: string;

  private cacheStanding$: Map<string, ConstructorStanding[]> = new Map();
  private cacheConstructors$: Observable<Constructor[]>;
  private cacheRaces$: Map<string, Observable<Race[]>> = new Map();
  private cacheQualifying$: Map<string, Observable<Race[]>> = new Map();
  private cacheSeasons$: Map<string, Observable<Season[]>> = new Map();

  constructor(private http: HttpClient, private config: Configuration) {}

  /**
   * Load the constructor standing of the season
   *
   * @param season season name
   */
  public getStandings(season: string) {
    if (this.cacheStanding$ && this.cacheStanding$.has(season)) {
      return of(this.cacheStanding$.get(season));
    }

    return this.loadStandings(season);
  }

  /**
   * Load all constructors of the season
   *
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheConstructors$) {
      this.seasonCache$ = season;
      this.cacheConstructors$ = this.load(season).pipe(shareReplay(1));
    }

    return this.cacheConstructors$;
  }

  public getResults(season: string, constructorId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season, constructorId);

    if (!this.cacheRaces$.get(constructorId)) {
      this.seasonCache$ = season;
      this.cacheRaces$.set(
        constructorId,
        this.loadResults(season, constructorId),
      );
    }

    return this.cacheRaces$.get(constructorId);
  }

  public getQualifying(
    season: string,
    constructorId: string,
  ): Observable<Race[]> {
    this.clearCacheIfNeeded(season, constructorId);

    if (!this.cacheQualifying$.get(constructorId)) {
      this.seasonCache$ = season;
      this.cacheQualifying$.set(
        constructorId,
        this.loadQualifying(season, constructorId),
      );
    }

    return this.cacheQualifying$.get(constructorId);
  }

  public getSeasons(constructorId: string): Observable<Season[]> {
    if (!this.cacheSeasons$.get(constructorId)) {
      this.cacheSeasons$.set(constructorId, this.loadSeasons(constructorId));
    }

    return this.cacheSeasons$.get(constructorId);
  }

  private clearCacheIfNeeded(season: string, constructorId: string = null) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheConstructors$ = null;
      if (constructorId == null) {
        this.cacheRaces$ = new Map();
        this.cacheQualifying$ = new Map();
      } else {
        this.cacheRaces$.delete(constructorId);
        this.cacheQualifying$.delete(constructorId);
      }
    }
  }

  /**
   * Load constructor standing from remote
   *
   * @param season season name
   */
  private loadStandings(season: string): Observable<ConstructorStanding[]> {
    return this.http
      .get<ErgastResponse>(
        `${this.config.ServerWithApiUrl}${season}/constructorStandings.json`,
      )
      .pipe(
        map(result => {
          const stand =
            result.MRData.StandingsTable.StandingsLists[0] === undefined
              ? []
              : result.MRData.StandingsTable.StandingsLists[0]
                  .ConstructorStandings;
          this.cacheStanding$.set(season, stand);
          return stand;
        }),
      );
  }

  /**
   * Load constructor's list from remote
   *
   * @param season season name
   */
  private load(season: string): Observable<Constructor[]> {
    return this.http
      .get<ErgastResponse>(
        `${this.config.ServerWithApiUrl}${season}/constructors.json`,
      )
      .pipe(map(result => result.MRData.ConstructorTable.Constructors));
  }

  /**
   * Load constructors results of the season from remote.
   *
   * @param season season name
   * @param constructorId constructor id
   */
  private loadResults(
    season: string,
    constructorId: string,
  ): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          this.config.ServerWithApiUrl
        }${season}/constructors/${constructorId}/results.json`,
      )
      .pipe(map(result => result.MRData.RaceTable.Races));
  }

  /**
   * Load constructors qualifying results of the season from remote.
   *
   * @param season season name
   * @param constructorId constructor id
   */
  private loadQualifying(
    season: string,
    constructorId: string,
  ): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          this.config.ServerWithApiUrl
        }${season}/constructors/${constructorId}/qualifying.json`,
      )
      .pipe(map(result => result.MRData.RaceTable.Races));
  }

  /**
   * Load all seasons for constructor from remote.
   *
   * @param constructorId constructor id
   */
  private loadSeasons(constructorId: string): Observable<Season[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          this.config.ServerWithApiUrl
        }constructors/${constructorId}/seasons.json?limit=1000`,
      )
      .pipe(map(result => result.MRData.SeasonTable.Seasons));
  }
}
