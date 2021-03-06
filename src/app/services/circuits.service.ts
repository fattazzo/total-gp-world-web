import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Circuit } from '../domain/circuit';
import { Configuration } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { Race } from '../domain/race';
import { Season } from '../domain/season';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CircuitsService {
  private seasonCache$: string;

  private cacheCircuits$: Circuit[];
  private cacheResults$: Map<string, Race[]> = new Map();
  private cacheSeasons$: Map<string, Season[]> = new Map();

  private cacheAllCircuits$: Circuit[];

  constructor(private http: HttpClient, private config: Configuration) {}

  /**
   * Load all circuits of the season
   *
   * @param season season name
   */
  public get(season: string, useCache = true) {
    if (useCache) {
      this.clearCacheIfNeeded(season);

      if (this.cacheCircuits$ && this.cacheCircuits$.length > 0) {
        return of(this.cacheCircuits$);
      }
    }

    return this.load(season, useCache);
  }

  /**
   * Load all circuits
   */
  public getAll() {
    if (this.cacheAllCircuits$ && this.cacheAllCircuits$.length > 0) {
      return of(this.cacheAllCircuits$);
    }

    return this.loadAll();
  }

  public getResults(season: string, circuitId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season);

    if (this.cacheResults$ && this.cacheResults$.get(circuitId)) {
      return of(this.cacheResults$.get(circuitId));
    }

    return this.loadResults(season, circuitId);
  }

  public getSeasons(circuitId: string): Observable<Season[]> {
    if (this.cacheSeasons$ && this.cacheSeasons$.get(circuitId)) {
      return of(this.cacheSeasons$.get(circuitId));
    }

    return this.loadSeasons(circuitId);
  }

  private clearCacheIfNeeded(season: string, circuitId: string = null) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheCircuits$ = null;
      if (circuitId == null) {
        this.cacheResults$ = new Map();
      } else {
        this.cacheResults$.delete(circuitId);
      }
    }
    this.seasonCache$ = season;
  }

  /**
   * Load circuit list from remote
   *
   * @param season season name
   */
  private load(season: string, useCache: boolean): Observable<Circuit[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}${season}/circuits.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const circuits =
            result.MRData.CircuitTable.Circuits !== undefined
              ? result.MRData.CircuitTable.Circuits
              : [];
          if (useCache) {
            this.cacheCircuits$ = circuits;
            this.seasonCache$ = season;
          }
          return circuits;
        }),
      );
  }

  /**
   * Load circuit list from remote
   */
  private loadAll(): Observable<Circuit[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}circuits.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          this.cacheAllCircuits$ = result.MRData.CircuitTable.Circuits;
          return this.cacheAllCircuits$;
        }),
      );
  }

  /**
   * Load circuit results from remote
   *
   * @param season  season name
   * @param circuitId circuit id
   */
  private loadResults(season: string, circuitId: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${
          environment.ergastApiUrl
        }${season}/circuits/${circuitId}/results.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          this.cacheResults$.set(circuitId, result.MRData.RaceTable.Races);
          return result.MRData.RaceTable.Races;
        }),
      );
  }

  /**
   * Load all seasons for the circuit from remote.
   *
   * @param circuitId circuit id
   */
  private loadSeasons(circuitId: string): Observable<Season[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}circuits/${circuitId}/seasons.json?limit=${
          environment.ergastApiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          this.cacheSeasons$.set(circuitId, result.MRData.SeasonTable.Seasons);
          return result.MRData.SeasonTable.Seasons;
        }),
      );
  }
}
