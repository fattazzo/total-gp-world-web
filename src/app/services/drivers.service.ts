import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { Configuration } from '../app.constants';
import { of } from "rxjs";

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
      console.log('Cache vuota, carica la classifica piloti');
      this.seasonCache$ = season;
      this.cache$ = this.loadStandings(season).pipe(
        shareReplay(1)
      );
    } else {
      console.log('Classifica piloti dalla cache');
    }

    return this.cache$;
  }

  private loadStandings(season: string) : Observable<DriverStanding[]> {
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
