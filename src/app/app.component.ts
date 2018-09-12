/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, enableProdMode } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from './app.constants';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private translate: TranslateService) {
    translate.addLangs(["en", "it"]);
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
