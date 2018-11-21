import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';
import { Race } from '../domain/race';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private cacheSchedule$: Map<string, Race[]> = new Map();

  constructor(private http: HttpClient, private config: Configuration) {}

  public getSchedule(season: string) {
    if (this.cacheSchedule$ && this.cacheSchedule$.has(season)) {
      return of(this.cacheSchedule$.get(season));
    }

    return this.loadSchedule(season);
  }

  private loadSchedule(season: string): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}.json`)
      .pipe(
        map(result => {
          const schedule =
            result.MRData.RaceTable.Races !== undefined
              ? result.MRData.RaceTable.Races
              : [];
          this.cacheSchedule$.set(season, schedule);
          return schedule;
        }),
      );
  }
}
