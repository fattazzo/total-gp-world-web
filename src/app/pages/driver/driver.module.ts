import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { DriverComponent } from './driver.component';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { DriverRoutingModule } from './driver-routing.module';
import { ResultsModule } from '../components/results/results.module';
import { QualifyingModule } from '../components/qualifying/qualifying.module';


@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        CdkTableModule,
        MatTableModule,
        WikipediaPageModule,
        DriverRoutingModule,
        ResultsModule,
        QualifyingModule
    ],
    declarations: [
        DriverComponent
    ],
})
export class DriverModule { }
