import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs";
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class Configuration implements OnInit {
    public Server = 'https://ergast.com/';
    public ApiUrl = 'api/f1/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;

    public season : Observable<string> = of('current');

    ngOnInit() {
        
    }

    public setSeason(newSeason : string) {
        console.log("Config: new season " + newSeason);
        this.season = of(newSeason);
        this.season.pipe(
            shareReplay(10)
          )
    }
}
