import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DriversStandingsComponent } from './drivers-standings/drivers-standings.component';
import { ConstructorStandingsComponent } from './constructor-standings/constructor-standings.component';
import { DriversStChartComponent } from './drivers-standings/drivers-st-chart/drivers-st-chart.component';
import { ConstructorsStChartComponent } from './constructor-standings/constructors-st-chart/constructors-st-chart.component';
import { StatusCardComponent } from './status-card/status-card.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule
  ],
  declarations: [
    DashboardComponent,
    DriversStandingsComponent,
    ConstructorStandingsComponent,
    DriversStChartComponent,
    ConstructorsStChartComponent,
    StatusCardComponent,
  ],
})
export class DashboardModule { }
