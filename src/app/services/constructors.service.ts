import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { ConstructorStanding } from '../domain/constructor-standing';

@Injectable({
  providedIn: 'root'
})
export class ConstructorsService {

  private cache$: Observable<ConstructorStanding[]>;
  private seasonCache$: string;

  constructor(private http: HttpClient, private config : Configuration) { }

  public getStandings(season: string) {
    if (!this.cache$ || season != this.seasonCache$) {
      console.log('Constructor standings: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cache$ = this.loadStandings(season).pipe(shareReplay(1));
    } else {
      console.log('Constructor standings: get data from cache');
    }

    return this.cache$;
  }

  private loadStandings(season: string) : Observable<ConstructorStanding[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/constructorStandings.json`)
      .pipe(map(result => {
          var tmp : ConstructorStanding[] = [];
          result['MRData']['StandingsTable']['StandingsLists'][0].ConstructorStandings.forEach( (element) => {
            tmp.push(new ConstructorStanding(element))
          });
          return tmp
          
        }));
  }
}
