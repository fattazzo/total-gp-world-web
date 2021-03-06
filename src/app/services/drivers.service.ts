import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { DriverStanding } from '../domain/driver-standing';
import { Driver } from '../domain/driver';
import { Race } from '../domain/race';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { Season } from '../domain/season';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private seasonCache$: string;

  private cacheStandings$: Map<string, DriverStanding[]> = new Map();
  private cacheDrivers$: Driver[];
  private cacheRaces: Map<string, Race[]> = new Map();
  private cacheQualifyng$: Map<string, Observable<Race[]>> = new Map();
  private cacheSeasons$: Map<string, Observable<Season[]>> = new Map();

  private cacheAllDrivers$: Driver[];

  constructor(private http: HttpClient) {}

  /**
   * Load the driver standing of the season
   *
   * @param season season name
   */
  public getStandings(season: string) {
    if (this.cacheStandings$ && this.cacheStandings$.has(season)) {
      return of(this.cacheStandings$.get(season));
    }

    return this.loadStandings(season);
  }

  /**
   * Load all drivers of the season
   *
   * @param season season name
   */
  public get(season: string, useCache = true) {
    if (useCache) {
      this.clearCacheIfNeeded(season);

      if (this.cacheDrivers$ && this.cacheDrivers$.length > 0) {
        return of(this.cacheDrivers$);
      }
    }

    return this.load(season, useCache);
  }

  /**
   * Load all drivers
   */
  public getAll() {
    if (this.cacheAllDrivers$ && this.cacheAllDrivers$.length > 0) {
      return of(this.cacheAllDrivers$);
    }

    return this.loadAll();
  }

  public getResults(season: string, driverId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season, driverId);

    if (this.cacheRaces && this.cacheRaces.has(driverId)) {
      return of(this.cacheRaces.get(driverId));
    }

    return this.loadResults(season, driverId);
  }

  public getQualifying(season: string, driverId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season, driverId);

    if (!this.cacheQualifyng$.get(driverId)) {
      this.seasonCache$ = season;
      this.cacheQualifyng$.set(driverId, this.loadQualifying(season, driverId));
    }

    return this.cacheQualifyng$.get(driverId);
  }

  public getSeasons(driverId: string): Observable<Season[]> {
    if (!this.cacheSeasons$.get(driverId)) {
      this.cacheSeasons$.set(driverId, this.loadSeasons(driverId));
    }

    return this.cacheSeasons$.get(driverId);
  }

  private clearCacheIfNeeded(season: string, driverId: string = null) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheDrivers$ = null;
      if (driverId == null) {
        this.cacheRaces = new Map();
        this.cacheQualifyng$ = new Map();
      } else {
        this.cacheRaces.delete(driverId);
        this.cacheQualifyng$.delete(driverId);
      }
    }
  }

  /**
   * Load driver standing from remote
   *
   * @param season season name
   */
  private loadStandings(season: string): Observable<DriverStanding[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}${season}/driverStandings.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const stand =
            result.MRData.StandingsTable.StandingsLists[0] === undefined
              ? []
              : result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          this.cacheStandings$.set(season, stand);
          return stand;
        }),
      );
  }

  /**
   * Load driver's list from remote
   *
   * @param season season name
   */
  private load(season: string, useCache: boolean): Observable<Driver[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}${season}/drivers.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const drivers =
            result.MRData.DriverTable.Drivers !== undefined
              ? result.MRData.DriverTable.Drivers
              : [];
          if (useCache) {
            this.cacheDrivers$ = drivers;
            this.seasonCache$ = season;
          }
          return drivers;
        }),
      );
  }

  /**
   * Load driver's list from remote
   */
  private loadAll(): Observable<Driver[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}drivers.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const drivers =
            result.MRData.DriverTable.Drivers !== undefined
              ? result.MRData.DriverTable.Drivers
              : [];
          this.cacheAllDrivers$ = drivers;
          return drivers;
        }),
      );
  }

  /**
   * Load driver results of the season from remote.
   *
   * @param season season name
   * @param driverId driver id
   */
  private loadResults(season: string, driverId: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          environment.ergastApiUrl
        }${season}/drivers/${driverId}/results.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const races =
            result.MRData.RaceTable.Races !== undefined
              ? result.MRData.RaceTable.Races
              : [];
          this.cacheRaces.set(driverId, races);
          this.seasonCache$ = season;
          return races;
        }),
      );
  }

  /**
   * Load driver qualifying results of the season from remote.
   *
   * @param season season name
   * @param driverId driver id
   */
  private loadQualifying(season: string, driverId: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          environment.ergastApiUrl
        }${season}/drivers/${driverId}/qualifying.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(map(result => result.MRData.RaceTable.Races));
  }

  /**
   * Load all season for driver from remote.
   *
   * @param driverId driver id
   */
  private loadSeasons(driverId: string): Observable<Season[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}drivers/${driverId}/seasons.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(map(result => result.MRData.SeasonTable.Seasons));
  }
}
