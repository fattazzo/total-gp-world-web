import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { SeasonsService } from '../../../services/seasons.service';

import { Observable } from "rxjs";
import { Season } from '../../../domain/season';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  seasons: Observable<Season[]>;
  @Input() selectedSeason: string = 'current';

  currentLang: string;
  langSubscribe: any;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private seasonsService: SeasonsService,
    public translate: TranslateService,
    private route: Router) {
  }

  ngOnInit() {
    this.seasons = this.seasonsService.seasons;
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);

    this.currentLang = this.translate.currentLang;
    this.langSubscribe = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang
    })
  }

  ngOnDestroy() {
    this.langSubscribe.unsubscribe();
  }

  onLangChange(lang: string) {
    this.translate.use(lang)
    this.currentLang = lang;
  }

  onChange(season: Season) {
    this.seasonsService.setSeason(season.season);
    this.selectedSeason = season.season;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  openOptions() {
    this.route.navigate(['/pages/options']);
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
