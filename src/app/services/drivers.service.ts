import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { DriverStanding } from '../domain/driver-standing'
import { Driver } from '../domain/driver';
import { WikipediaPage } from '../domain/wikipedia-page';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private seasonCache$: string;

  private cacheStandings$: Observable<DriverStanding[]>;
  private cacheDrivers$: Observable<Driver[]>;

  constructor(private http: HttpClient, private config: Configuration) { }

  /**
   * Load the driver standing of the season
   * 
   * @param season season name
   */
  public getStandings(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheStandings$) {
      console.log('Driver standings: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cacheStandings$ = this.loadStandings(season).pipe(shareReplay(1));
    } else {
      console.log('Driver standings: get data from cache');
    }

    return this.cacheStandings$;
  }

  /**
   * Load all drivers of the season
   * 
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheDrivers$) {
      console.log('Drivers: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cacheDrivers$ = this.load(season).pipe(shareReplay(1));
    } else {
      console.log('Drivers: get data from cache');
    }

    return this.cacheDrivers$;
  }

  public getInfo(driver: Driver): Observable<WikipediaPage> {
    var restUrl = driver.url.replace('/wiki/', '/api/rest_v1/page/summary/');
    return this.http.get<WikipediaPage>(restUrl);
  }

  private clearCacheIfNeeded(season: string) {
    if (season != this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheDrivers$ = null;
      this.cacheStandings$ = null;
    }
  }

  /**
   * Load driver standing from remote
   * 
   * @param season season name
   */
  private loadStandings(season: string): Observable<DriverStanding[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/driverStandings.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/driverStandings.json`)
      .pipe(map(result => {
        var tmp: DriverStanding[] = [];
        result['MRData']['StandingsTable']['StandingsLists'][0].DriverStandings.forEach((element) => {
          tmp.push(new DriverStanding(element))
        });
        return tmp

      }));
  }

  /**
   * Load driver's list from remote
   * 
   * @param season season name
   */
  private load(season: string): Observable<Driver[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/drivers.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/drivers.json`)
      .pipe(map(result => {
        var tmp: Driver[] = [];
        result['MRData']['DriverTable'].Drivers.forEach((element) => {
          tmp.push(new Driver(element))
        });
        return tmp

      }));
  }
}
