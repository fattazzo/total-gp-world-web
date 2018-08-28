import { Injectable } from '@angular/core';
import { WikipediaPage } from '../domain/wikipedia-page';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WikipediaLangs, WikiLang } from '../domain/wikipedia-langs';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { first, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  public getInfo(wikiUrl: string, lang: string): Observable<WikipediaPage> {
    var restUrl = wikiUrl
      .replace(new RegExp('.+?(?=wikipedia.)'), `https://${lang}.`)
      .replace('/wiki/', '/api/rest_v1/page/summary/');

    console.log(`Calling ${restUrl}`);

    return this.http.get<WikipediaPage>(restUrl);
  }

  public getAvailableLangs(wikiUrl: string): Observable<WikiLang[]> {
    // transform standard url https://en.wikipedia.org/wiki/Sebastian%20Vettel
    // like https://en.wikipedia.org/w/api.php?action=query&titles=Sebastian%20Vettel&prop=langlinks&lllimit=500&format=json&formatversion=2
    var apiUrl = wikiUrl
      .replace('http://', 'https://')
      .replace('/wiki/', '/w/api.php?action=query&titles=')
      + '&prop=langlinks&lllimit=500&format=json&formatversion=2&origin=*';

    console.log(`Calling ${apiUrl}`);

    return this.http.get<WikipediaLangs>(apiUrl).pipe(map(result => result.query.pages[0].langlinks));
  }
}
