import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualifyngComponent } from './qualifying.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { QualifyingTableComponent } from './qualifying-table/qualifying-table.component';
import { QualifyingHeaderComponent } from './qualifying-header/qualifying-header.component';
import { QualifyingChartComponent } from './qualifying-chart/qualifying-chart.component';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    TableModule,
    TranslateModule,
    ChartModule
  ],
  exports: [
    QualifyngComponent
  ],
  declarations: [
    QualifyngComponent,
    QualifyingTableComponent,
    QualifyingHeaderComponent,
    QualifyingChartComponent
  ]
})
export class QualifyingModule { }
