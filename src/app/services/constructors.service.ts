import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { ConstructorStanding } from '../domain/constructor-standing';
import { Constructor } from '../domain/constructor';

@Injectable({
  providedIn: 'root'
})
export class ConstructorsService {

  private seasonCache$: string;

  private cacheStanding$: Observable<ConstructorStanding[]>;
  private cacheConstructors$: Observable<Constructor[]>;

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

  private clearCacheIfNeeded(season: string) {
    if (season != this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheConstructors$ = null;
      this.cacheStanding$ = null;
    }
  }

  /**
   * Load constructor standing from remote
   * 
   * @param season season name
   */
  private loadStandings(season: string): Observable<ConstructorStanding[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
      .pipe(map(result => {
        var tmp: ConstructorStanding[] = [];
        result['MRData']['StandingsTable']['StandingsLists'][0].ConstructorStandings.forEach((element) => {
          tmp.push(new ConstructorStanding(element))
        });
        return tmp

      }));
  }

  /**
   * Load constructor's list from remote
   * 
   * @param season season name
   */
  private load(season: string): Observable<Constructor[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructors.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/constructors.json`)
      .pipe(map(result => {
        var tmp: Constructor[] = [];
        result['MRData']['ConstructorTable'].Constructors.forEach((element) => {
          tmp.push(new Constructor(element))
        });
        return tmp

      }));
  }
}
