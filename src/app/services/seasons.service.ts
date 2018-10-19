import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '../app.constants';
import { BehaviorSubject } from 'rxjs';
import { Season } from '../domain/season';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {

  private seasonsCache$: Observable<Season[]>;

  private season = new BehaviorSubject<string>('current');

  constructor(private http: HttpClient, private config: Configuration) { }

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
    const currentYear = new Date().getFullYear();
    const diffYears = currentYear - 1950 + 1;
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}seasons.json?limit=${currentYear}&offset=0`)
      .pipe(map(result => {
        const tmp: Season[] = result.MRData.SeasonTable.Seasons;
        const currentSeason = new Season();
        currentSeason.season = 'current';
        currentSeason.url = '';
        tmp.push(currentSeason);
        return tmp
      }));
  }
}
