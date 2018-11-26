import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbSelectModule, NbButtonModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ComparisonRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './comparison.component';
import { DriversSelectionModule } from '../components/drivers-selection/drivers-selection.module';
import { ConstructorsSelectionModule } from '../components/constructors-selection/constructors-selection.module';
import { ComparisonChartComponent } from './comparison-chart/comparison-chart.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [ComparisonComponent, ComparisonChartComponent],
  imports: [
    ThemeModule,
    CommonModule,
    ComparisonRoutingModule,
    NbSelectModule,
    TranslateModule,
    DriversSelectionModule,
    ConstructorsSelectionModule,
    NbButtonModule,
    ChartModule,
  ],
})
export class ComparisonModule {}
