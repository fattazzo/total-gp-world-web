import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../../@theme/theme.module';

import { ConstructorStandingsComponent } from './constructor-standings.component';
import { ConstructorsStTableComponent } from './constructors-st-table/constructors-st-table.component';
import { ConstructorsStChartComponent } from './constructors-st-chart/constructors-st-chart.component';

import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    ConstructorStandingsComponent,
    ConstructorsStTableComponent,
    ConstructorsStChartComponent
  ],
  exports: [
    ConstructorStandingsComponent,
    ConstructorsStTableComponent,
    ConstructorsStChartComponent
  ]
})
export class ConstructorStandingsModule { }
