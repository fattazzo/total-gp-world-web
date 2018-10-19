import { Component, OnInit, OnDestroy } from '@angular/core';

import { MENU_I18N_SPEC } from './pages-menu';
import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';
import { CapitalizePipe } from '../@theme/pipes';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  menuI18NTitle: TitleI18NSpec[] = MENU_I18N_SPEC;
  menu: NbMenuItem[] = MENU_I18N_SPEC.map(item => item.menuItem);

  i18nSubscription: any;

  constructor(
    private translate: TranslateService,
    private capitalizePipe: CapitalizePipe,
    private uppercasePipe: UpperCasePipe,
  ) {}

  ngOnInit() {
    this.i18nSubscription = this.translate.onLangChange.subscribe(lang => {
      this.applyI18N();
    });
    this.applyI18N();
  }

  ngOnDestroy() {
    this.i18nSubscription.unsubscribe();
  }

  private applyI18N() {
    this.menu.forEach((item, idx, arr) => {
      const spec = this.menuI18NTitle[idx];
      if (spec !== undefined) {
        item.title = this.translate.instant(spec.key);
        if (spec.capitalize) {
          item.title = this.capitalizePipe.transform(item.title);
        }
        if (spec.uppercase) {
          item.title = this.uppercasePipe.transform(item.title);
        }
      }
    });
  }
}

export class TitleI18NSpec {
  public capitalize: boolean;
  public uppercase: boolean;
  key: string;
  menuItem: NbMenuItem;

  constructor(
    capitalize: boolean = true,
    uppercase: boolean = false,
    key: string,
    menuItem: NbMenuItem,
  ) {
    this.capitalize = capitalize;
    this.uppercase = uppercase;
    this.key = key;
    this.menuItem = menuItem;
  }
}
