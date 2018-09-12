import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { CircuitComponent } from './circuit.component';


import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { CircuitRoutingModule } from './circuit-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    WikipediaPageModule,
    CircuitRoutingModule
  ],
  declarations: [
    CircuitComponent
  ],
})
export class CircuitModule { }