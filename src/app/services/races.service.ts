import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';
import { Race } from '../domain/race';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  private cache$: Observable<Race[]>;
  private seasonCache$: string;

  constructor(private http: HttpClient, private config: Configuration) { }

  public getSchedule(season: string) {
    if (!this.cache$ || season != this.seasonCache$) {
      console.log('Race schedule: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cache$ = this.loadSchedule(season).pipe(shareReplay(1));
    } else {
      console.log('Race schedule: get data from cache');
    }

    return this.cache$;
  }

  private loadSchedule(season: string): Observable<Race[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}.json`)
      .pipe(map(result => {
        var tmp: Race[] = [];
        result['MRData']['RaceTable'].Races.forEach((element) => {
          tmp.push(new Race(element))
        });
        return tmp

      }));
  }
}
