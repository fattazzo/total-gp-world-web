import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WikipediaPage } from './domain/wikipedia-page';
import { WikipediaService } from './service/wikipedia.service';
import { WikipediaLangs, WikiLang } from './domain/wikipedia-langs';
import { Observable } from 'rxjs';

@Component({
  selector: 'wikipedia-page',
  templateUrl: './wikipedia-page.component.html',
  styleUrls: ['./wikipedia-page.component.scss']
})
export class WikipediaPageComponent implements OnInit {

  wikiPage: WikipediaPage;
  wikiLangs: WikiLang[];

  wikiLang: string;

  private url$: string;

  constructor(private wikipediaService: WikipediaService, public translate: TranslateService) { }

  ngOnInit() {
    this.wikiLang = this.translate.currentLang;
  }

  @Input('wikiUrl')
  set wikiUrl(url: string) {
    this.url$ = url;
    this.wikiPage = undefined;
    this.wikiLangs = undefined;

    if (url != undefined) {
      this.wikipediaService.getInfo(url, this.wikiLang).subscribe(info => this.wikiPage = info);
      this.wikipediaService.getAvailableLangs(url).subscribe(res => this.wikiLangs = res);
    }
  }

  reloadLang(newLang) {
    this.wikiLang = newLang;
    this.wikipediaService.getInfo(this.url$, newLang).subscribe(info => this.wikiPage = info);
  }
}
