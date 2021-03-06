import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { DriverStandingsModule } from './driver-standings/driver-standings.module';
import { ConstructorStandingsModule } from './constructor-standings/constructor-standings.module';
import { ScheludedRacesModule } from './scheluded-races/scheluded-races.module';

import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    DriverStandingsModule,
    ConstructorStandingsModule,
    ScheludedRacesModule,
    TranslateModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
