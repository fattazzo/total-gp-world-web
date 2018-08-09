import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import { DriverStanding } from '../domain/driver-standing'

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private cache$: Observable<DriverStanding[]>;
  private seasonCache$: string;

  constructor(private http: HttpClient, private config : Configuration) { }

  public getStandings(season: string) {
    if (!this.cache$ || season != this.seasonCache$) {
      console.log('Driver standings: Empty cache, load from remote');
      this.seasonCache$ = season;
      this.cache$ = this.loadStandings(season).pipe(shareReplay(1));
    } else {
      console.log('Driver standings: get data from cache');
    }

    return this.cache$;
  }

  private loadStandings(season: string) : Observable<DriverStanding[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/driverStandings.json`)
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/driverStandings.json`)
      .pipe(map(result => {
          var tmp : DriverStanding[] = [];
          result['MRData']['StandingsTable']['StandingsLists'][0].DriverStandings.forEach( (element) => {
            tmp.push(new DriverStanding(element))
          });
          return tmp
          
        }));
  }
}
