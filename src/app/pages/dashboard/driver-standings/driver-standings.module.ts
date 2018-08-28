import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

//import { DriverStandingsModule } from './driver-standings/driver-standings.module';
import { DriverStandingsComponent } from './driver-standings.component';
import { DriversStTableComponent } from './drivers-st-table/drivers-st-table.component';
import { DriversStChartComponent } from './drivers-st-chart/drivers-st-chart.component';

import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    RouterModule
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
