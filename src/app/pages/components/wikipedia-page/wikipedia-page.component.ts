import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WikipediaPage } from './domain/wikipedia-page';
import { WikipediaService } from './service/wikipedia.service';
import { WikiLang } from './domain/wikipedia-langs';

@Component({
  selector: 'wikipedia-page',
  templateUrl: './wikipedia-page.component.html',
  styleUrls: ['./wikipedia-page.component.scss']
})
export class WikipediaPageComponent {

  wikiPage: WikipediaPage;
  wikiLangs: WikiLang[];

  wikiLang: string;

  private url$: string;

  constructor(private wikipediaService: WikipediaService, public translate: TranslateService) { }

  @Input('wikiUrl')
  set wikiUrl(url: string) {
    this.url$ = url;
    this.wikiPage = undefined;
    this.wikiLangs = undefined;

    if (url != undefined) {
      this.wikipediaService.getInfo(url, this.translate.currentLang)
        .subscribe(
          info => {
            this.wikiLang = this.translate.currentLang;
            this.wikiPage = info
          },
          err => {
            if (this.translate.currentLang != this.translate.defaultLang) {
              this.reloadLang(this.translate.defaultLang);
            }
          });
      this.wikipediaService.getAvailableLangs(url).subscribe(res => this.wikiLangs = res);
    }
  }

  reloadLang(newLang) {
    this.wikiLang = newLang;
    this.wikipediaService.getInfo(this.url$, newLang).subscribe(info => this.wikiPage = info);
  }
}
