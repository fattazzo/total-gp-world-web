import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '../../services/app-settings.service';

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

  filterVisible: boolean;

  constructor(
    public translate: TranslateService,
    private appSettings: AppSettingsService,
  ) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.langSubscribe = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
    this.filterVisible = this.appSettings.filterVisible;
  }

  ngOnDestroy() {
    this.langSubscribe.unsubscribe();
  }

  onLangChange(lang: any) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  onFilterVisibleChange(value: boolean) {
    this.appSettings.filterVisible = value;
    this.filterVisible = value;
  }
}
