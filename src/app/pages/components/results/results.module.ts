import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material';
import { ResultsComponent } from './results.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { ResultsChartsComponent } from './results-charts/results-charts.component';
import { ResultsHeaderComponent } from './results-header/results-header.component';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    TableModule
  ],
  exports: [
    ResultsComponent
  ],
  declarations: [
    ResultsComponent,
    ResultsHeaderComponent,
    ResultsTableComponent,
    ResultsChartsComponent
  ]
})
export class ResultsModule { }
