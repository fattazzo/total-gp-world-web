import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Circuit } from '../domain/circuit';
import { Configuration } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { Race } from '../domain/race';
import { Season } from '../domain/season';

@Injectable({
  providedIn: 'root',
})
export class CircuitsService {
  private seasonCache$: string;

  private cacheCircuits$: Circuit[];
  private cacheResults$: Map<string, Race[]> = new Map();
  private cacheSeasons$: Map<string, Season[]> = new Map();

  constructor(private http: HttpClient, private config: Configuration) {}

  /**
   * Load all circuits of the season
   *
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (this.cacheCircuits$ && this.cacheCircuits$.length > 0) {
      return of(this.cacheCircuits$);
    }

    return this.load(season);
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
  private load(season: string): Observable<Circuit[]> {
    return this.http
      .get<ErgastResponse>(
        `${this.config.ServerWithApiUrl}${season}/circuits.json`,
      )
      .pipe(
        map(result => {
          this.cacheCircuits$ = result.MRData.CircuitTable.Circuits;
          return this.cacheCircuits$;
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
          this.config.ServerWithApiUrl
        }${season}/circuits/${circuitId}/results.json`,
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
        `${
          this.config.ServerWithApiUrl
        }circuits/${circuitId}/seasons.json?limit=1000`,
      )
      .pipe(
        map(result => {
          this.cacheSeasons$.set(circuitId, result.MRData.SeasonTable.Seasons);
          return result.MRData.SeasonTable.Seasons;
        }),
      );
  }
}
