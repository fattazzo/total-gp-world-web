import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { SeasonsService } from '../../../services/seasons.service';

import { Configuration } from '../../../app.constants';
import { of, Observable } from "rxjs";
import { shareReplay, map } from 'rxjs/operators';
import { Season } from '../../../domain/season';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  seasons: Observable<Season[]>;

  @Input() selectedSeason: string = 'current';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private seasonsService: SeasonsService) {
  }

  ngOnInit() {
    this.seasons = this.seasonsService.seasons;
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  onChange(seasonValue) {
    console.log("Cambio season a " + seasonValue);

    this.seasonsService.setSeason(seasonValue);
    this.selectedSeason = seasonValue;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
