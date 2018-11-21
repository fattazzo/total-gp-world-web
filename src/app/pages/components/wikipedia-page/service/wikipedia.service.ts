import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikiLang, WikipediaLangs } from '../domain/wikipedia-langs';
import { WikipediaPage } from '../domain/wikipedia-page';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  public getInfo(wikiUrl: string, lang: string): Observable<WikipediaPage> {
    const restUrl = wikiUrl
      .replace(new RegExp('.+?(?=wikipedia.)'), `https://${lang}.`)
      .replace('/wiki/', '/api/rest_v1/page/summary/');

    return this.http.get<WikipediaPage>(restUrl);
  }

  public getAvailableLangs(wikiUrl: string): Observable<WikiLang[]> {
    // transform standard url https://en.wikipedia.org/wiki/Sebastian%20Vettel
    // like https://en.wikipedia.org/w/api.php?action=query&titles=Sebastian%20Vettel&prop=langlinks&lllimit=500&format=json&formatversion=2
    const apiUrl =
      wikiUrl
        .replace('http://', 'https://')
        .replace('/wiki/', '/w/api.php?action=query&titles=') +
      '&prop=langlinks&lllimit=500&format=json&formatversion=2&origin=*';

    return this.http
      .get<WikipediaLangs>(apiUrl)
      .pipe(map(result => result.query.pages[0].langlinks));
  }
}
