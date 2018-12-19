import { Injectable } from '@angular/core';
import { RaceResultsModel } from '../pages/query/params/race-results/models/race-results-model';
import { HttpClient } from '@angular/common/http';
import { MRData } from '../domain/ergast/mrdata';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ErgastResponse } from '../domain/ergast/ergast-response';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {}

  search(url: string): Observable<MRData> {
    return this.http
      .get<ErgastResponse>(url.replace('http://', 'https://'))
      .pipe(
        map(result => {
          return result.MRData;
        }),
      );
  }
}
