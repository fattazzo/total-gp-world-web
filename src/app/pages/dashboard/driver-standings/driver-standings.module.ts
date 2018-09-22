import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart'

import { ThemeModule } from '../../../@theme/theme.module';

import { DriverStandingsComponent } from './driver-standings.component';
import { DriversStTableComponent } from './drivers-st-table/drivers-st-table.component';
import { DriversStChartComponent } from './drivers-st-chart/drivers-st-chart.component';

import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
    TranslateModule,
    ChartModule
  ],
  declarations: [
    DriverStandingsComponent,
    DriversStTableComponent,
    DriversStChartComponent
  ],
  exports: [
    DriverStandingsComponent,
    DriversStTableComponent,
    DriversStChartComponent
  ]
})
export class DriverStandingsModule { }
