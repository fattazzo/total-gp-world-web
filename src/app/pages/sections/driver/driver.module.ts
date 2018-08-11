import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';
import { DriverComponent } from './driver.component';
import { DriverWikiComponent } from './driver-wiki/driver-wiki.component';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        CdkTableModule,
        MatTableModule
    ],
    declarations: [
        DriverComponent,
        DriverWikiComponent
    ],
})
export class DriverModule { }
