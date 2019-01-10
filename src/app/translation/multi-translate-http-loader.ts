import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export function createMultiTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/base/', suffix: '.json' },
    { prefix: './assets/i18n/settings/', suffix: '.json' },
    { prefix: './assets/i18n/faq/', suffix: '.json' },
    { prefix: './assets/i18n/ergast/finishing-status/', suffix: '.json' },
  ]);
}

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    public resources: { prefix: string; suffix: string }[] = [
      { prefix: '/assets/i18n/', suffix: '.json' },
    ],
  ) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {
    return forkJoin(
      this.resources.map(config => {
        return this.http.get(`${config.prefix}${lang}${config.suffix}`);
      }),
    ).pipe(
      map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      }),
    );
  }
}
