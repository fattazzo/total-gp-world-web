import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'themes-switcher',
  templateUrl: './themes-switcher.component.html',
  styleUrls: ['./themes-switcher.component.scss']
})
export class ThemesSwitcherComponent implements OnInit {

  currentTheme: string;

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

  constructor(
    private themeService: NbThemeService,
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
  }

  onToggleTheme(themeKey: string) {
    this.themeService.changeTheme(themeKey);
    this.analyticsService.trackEvent('switchTheme');
    this.currentTheme = themeKey;
  }

}
