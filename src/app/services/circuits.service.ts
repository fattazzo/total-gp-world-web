import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Circuit } from '../domain/circuit';
import { Configuration } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { WikipediaPage } from '../pages/components/wikipedia-page/domain/wikipedia-page';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private cacheCircuits$: Observable<Circuit[]>;
  private seasonCache$: string;

  constructor(private http: HttpClient, private config: Configuration) { }

  /**
   * Load all circuits of the season
   * 
   * @param season season name
   */
  public get(season: string) {
    this.clearCacheIfNeeded(season);

    if (!this.cacheCircuits$) {
      console.log(`Circuits ${season}: Empty cache, load from remote`);
      this.seasonCache$ = season;
      this.cacheCircuits$ = this.load(season).pipe(shareReplay(1));
    } else {
      console.log(`Circuits ${season}: get data from cache`);
    }

    return this.cacheCircuits$;
  }

  private clearCacheIfNeeded(season: string) {
    if (season != this.seasonCache$) {
      this.seasonCache$ = null;
      this.cacheCircuits$ = null;
    }
  }

  /**
   * Load circuit list from remote
   * 
   * @param season season name
   */
  private load(season: string): Observable<Circuit[]> {
    console.log(`Calling ${this.config.ServerWithApiUrl}${season}/circuits.json`)
    return this.http.get<ErgastResponse>(`${this.config.ServerWithApiUrl}${season}/circuits.json`)
      .pipe(map(result => result.MRData.CircuitTable.Circuits)
      );
  }
}
