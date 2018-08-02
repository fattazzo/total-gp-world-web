import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '../app.constants';

const headers = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private config : Configuration) { }

  getSeasons<SeasonsResponse>() {
    console.log('Calling: ' + this.config.ServerWithApiUrl + 'seasons.json');
    return this.http.get<SeasonsResponse>(this.config.ServerWithApiUrl + 'seasons.json');
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            //req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        //req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
        //req = req.clone({ headers: req.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        
        return next.handle(req);
    }
}
