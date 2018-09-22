import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { ResultsComponent } from './results.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { ResultsChartsComponent } from './results-charts/results-charts.component';
import { ResultsHeaderComponent } from './results-header/results-header.component';
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
