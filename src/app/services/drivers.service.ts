import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Configuration } from '../app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient, private config : Configuration) { }

  getStandings(season : string) {
    console.log(`Calling: ${this.config.ServerWithApiUrl}${season}/driverStandings.json`);
    return this.http.get(`${this.config.ServerWithApiUrl}${season}/driverStandings.json`)
      .pipe(map(result => result['MRData']['StandingsTable']['StandingsLists'][0].DriverStandings));
  }
}
