import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '../app.constants';
import { BehaviorSubject } from 'rxjs';
import { Season } from '../domain/season';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private seasonsCache$: Observable<Season[]>;

  private season = new BehaviorSubject<string>('current');

  constructor(private http: HttpClient, private config: Configuration) {}

  setSeason(newSeason: string) {
    this.season.next(newSeason);
    this.config.season = newSeason;
  }

  getSeason(): Observable<string> {
    return this.season.asObservable();
  }

  get seasons() {
    if (!this.seasonsCache$) {
      this.seasonsCache$ = this.loadSeasons();
    }

    return this.seasonsCache$;
  }

  private loadSeasons(): Observable<Season[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.ergastApiUrl}seasons.json?limit=${
          environment.ergastApiPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const tmp: Season[] = result.MRData.SeasonTable.Seasons;
          const currentSeason = new Season();
          currentSeason.season = 'current';
          currentSeason.url = '';
          tmp.push(currentSeason);
          return tmp;
        }),
      );
  }
}
