import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';
import { Race } from '../domain/race';
import { ErgastResponse } from '../domain/ergast/ergast-response';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private seasonCache$: string;

  private cacheSchedule$: Observable<Race[]>;

  constructor(private http: HttpClient, private config: Configuration) {}

  public getSchedule(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheSchedule$) {
      this.seasonCache$ = season;
      this.cacheSchedule$ = this.loadSchedule(season).pipe(shareReplay(1));
    }

    return this.cacheSchedule$;
  }

  private clearCacheIfNeeded(season: string) {
    if (season !== this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheSchedule$ = null;
    }
  }

  private loadSchedule(season: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}.json`)
      .pipe(map(result => result.MRData.RaceTable.Races));
  }
}
