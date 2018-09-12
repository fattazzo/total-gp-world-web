import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualifyngComponent } from './qualifying.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material';
import { QualifyingTableComponent } from './qualifying-table/qualifying-table.component';
import { QualifyingHeaderComponent } from './qualifying-header/qualifying-header.component';
import { QualifyingChartComponent } from './qualifying-chart/qualifying-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule
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
