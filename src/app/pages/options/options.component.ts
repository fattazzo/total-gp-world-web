import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit, OnDestroy {
  currentLang: string;
  langSubscribe: any;

  themes = [
    {
      title: 'Light',
      key: 'default',
    },
    {
      title: 'Cosmic',
      key: 'cosmic',
    },
    {
      title: 'Corporate',
      key: 'corporate',
    },
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.langSubscribe = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  ngOnDestroy() {
    this.langSubscribe.unsubscribe();
  }

  onLangChange(lang: any) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
