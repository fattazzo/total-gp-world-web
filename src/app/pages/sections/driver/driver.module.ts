import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';
import { DriverComponent } from './driver.component';
import { DriverWikiComponent } from './driver-wiki/driver-wiki.component';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DriverResultsComponent } from './driver-results/driver-results.component';
import { DriverResultsChartComponent } from './driver-results-chart/driver-results-chart.component';


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
        DriverResultsChartComponent
    ],
})
export class DriverModule { }
