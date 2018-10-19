import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private cacheCircuits$: Observable<Circuit[]>;
  private cacheResults$: Map<string, Observable<Race[]>> = new Map();
  private cacheSeasons$: Map<string, Observable<Season[]>> = new Map();

  constructor(private http: HttpClient, private config: Configuration) { }

  /**
   * Load all circuits of the season
   *
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheCircuits$) {
      this.seasonCache$ = season;
      this.cacheCircuits$ = this.load(season).pipe(shareReplay(1));
    }

    return this.cacheCircuits$;
  }

  public getResults(season: string, circuitId: string): Observable<Race[]> {
    this.clearCacheIfNeeded(season)

    if (!this.cacheResults$.get(circuitId)) {
      this.seasonCache$ = season;
      this.cacheResults$.set(circuitId, this.loadResults(season, circuitId));
    }

    return this.cacheResults$.get(circuitId);
  }

  public getSeasons(circuitId: string): Observable<Season[]> {
    if (!this.cacheSeasons$.get(circuitId)) {
      this.cacheSeasons$.set(circuitId, this.loadSeasons(circuitId));
    }

    return this.cacheSeasons$.get(circuitId);
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
  }

  /**
   * Load circuit list from remote
   *
   * @param season season name
   */
  private load(season: string): Observable<Circuit[]> {
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/circuits.json`)
      .pipe(map(result => result.MRData.CircuitTable.Circuits),
      );
  }

  /**
   * Load circuit results from remote
   *
   * @param season  season name
   * @param circuitId circuit id
   */
  private loadResults(season: string, circuitId: string): Observable<Race[]> {
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/circuits/${circuitId}/results.json`)
      .pipe(map(result => result.MRData.RaceTable.Races),
      );
  }

  /**
   * Load all seasons for the circuit from remote.
   *
   * @param circuitId circuit id
   */
  private loadSeasons(circuitId: string): Observable<Season[]> {
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}circuits/${circuitId}/seasons.json?limit=1000`)
      .pipe(map(result => result.MRData.SeasonTable.Seasons),
      );
  }
}
