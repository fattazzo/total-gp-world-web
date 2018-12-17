import { Injectable } from '@angular/core';
import { RaceResultsModel } from '../pages/query/params/race-results/models/race-results-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {}

  getResults(raceResultModel: RaceResultsModel): any {}
}
