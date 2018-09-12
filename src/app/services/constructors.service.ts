import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { ConstructorStanding } from '../domain/constructor-standing';
import { Constructor } from '../domain/constructor';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { of } from 'rxjs';
import { WikipediaPage } from '../pages/components/wikipedia-page/domain/wikipedia-page';
import { Race } from '../domain/race';

@Injectable({
  providedIn: 'root'
})
export class ConstructorsService {

  private seasonCache$: string;

  private cacheStanding$: Observable<ConstructorStanding[]>;
  private cacheConstructors$: Observable<Constructor[]>;
  private cacheRaces$: Map<string, Observable<Race[]>> = new Map();

  constructor(private http: HttpClient, private config: Configuration) { }

  /**
   * Load the constructor standing of the season
   * 
   * @param season season name
   */
  public getStandings(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheStanding$) {
      console.log('Constructor standings: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cacheStanding$ = this.loadStandings(season).pipe(shareReplay(1));
    } else {
      console.log('Constructor standings: get data from cache');
    }

    return this.cacheStanding$;
  }

  /**
   * Load all constructors of the season
   * 
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheConstructors$) {
      console.log('Constructors: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cacheConstructors$ = this.load(season).pipe(shareReplay(1));
    } else {
      console.log('Constructors: get data from cache');
    }

    return this.cacheConstructors$;
  }

  public getResults(season: string, constructorId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season, constructorId);

    if (!this.cacheRaces$.get(constructorId)) {
      console.log('Results: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cacheRaces$.set(constructorId, this.loadResults(season, constructorId));
    } else {
      console.log('Results: get data from cache');
    }

    return this.cacheRaces$.get(constructorId);
  }

  private clearCacheIfNeeded(season: string, constructorId: string = null) {
    if (season != this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheConstructors$ = null;
      this.cacheStanding$ = null;
      if (constructorId == null) {
        this.cacheRaces$ = new Map();
      } else {
        this.cacheRaces$.delete(constructorId);
      }
    }
  }

  /**
   * Load constructor standing from remote
   * 
   * @param season season name
   */
  private loadStandings(season: string): Observable<ConstructorStanding[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
      .pipe(map(result =>
        (result.MRData.StandingsTable.StandingsLists[0] === undefined) ? [] : result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
      );
  }

  /**
   * Load constructor's list from remote
   * 
   * @param season season name
   */
  private load(season: string): Observable<Constructor[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructors.json`)
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/constructors.json`)
      .pipe(map(result => result.MRData.ConstructorTable.Constructors)
      );
  }

  /**
   * Load constructors results of the season from remote.
   * 
   * @param season season name
   * @param constructorId constructor id
   */
  private loadResults(season: string, constructorId: string): Observable<Race[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructors/${constructorId}/results.json`)
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/constructors/${constructorId}/results.json`)
      .pipe(map(result => result.MRData.RaceTable.Races)
      );
  }
}
