import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';
import { DriverComponent } from './driver.component';
import { DriverWikiComponent } from './driver-wiki/driver-wiki.component';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DriverResultsComponent } from './driver-results/driver-results.component';
import { DriverResultsTableComponent } from './driver-results/driver-results-table/driver-results-table.component';
import { DriverResultsChartsComponent } from './driver-results/driver-results-charts/driver-results-charts.component';
import { DriverQualifyingComponent } from './driver-qualifying/driver-qualifying.component';
import { DriverQualifyingTableComponent } from './driver-qualifying/driver-qualifying-table/driver-qualifying-table.component';
import { DriverQualifyingChartComponent } from './driver-qualifying/driver-qualifying-chart/driver-qualifying-chart.component';
import { DriverQualifyingHeaderComponent } from './driver-qualifying/driver-qualifying-header/driver-qualifying-header.component';
import { DriverResultsHeaderComponent } from './driver-results/driver-results-header/driver-results-header.component';


@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        CdkTableModule,
        MatTableModule
    ],
    declarations: [
        DriverComponent,
        DriverWikiComponent,
        DriverResultsComponent,
        DriverResultsTableComponent,
        DriverResultsChartsComponent,
        DriverQualifyingComponent,
        DriverQualifyingTableComponent,
        DriverQualifyingChartComponent,
        DriverQualifyingHeaderComponent,
        DriverResultsHeaderComponent,
    ],
})
export class DriverModule { }
