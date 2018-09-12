import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { ConstructorComponent } from './constructor.component';


import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { ConstructorRoutingModule } from './constructor-routing.module';
import { ResultsModule } from '../components/results/results.module';


@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        CdkTableModule,
        MatTableModule,
        WikipediaPageModule,
        ConstructorRoutingModule,
        ResultsModule
    ],
    declarations: [
        ConstructorComponent
    ],
})
export class ConstructorModule { }
