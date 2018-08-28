import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { DriverStandingsModule } from './driver-standings/driver-standings.module';
import { ConstructorStandingsModule } from './constructor-standings/constructor-standings.module';
import { ScheludedRacesModule } from './scheluded-races/scheluded-races.module';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    DriverStandingsModule,
    ConstructorStandingsModule,
    ScheludedRacesModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
  ]
})
export class DashboardModule { }
