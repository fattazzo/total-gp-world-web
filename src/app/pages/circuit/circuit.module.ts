import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { CircuitComponent } from './circuit.component';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { CircuitRoutingModule } from './circuit-routing.module';

import { DropdownModule } from 'primeng/dropdown';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    WikipediaPageModule,
    CircuitRoutingModule,
    DropdownModule,
    ApplicationPipesModule
  ],
  declarations: [
    CircuitComponent
  ],
})
export class CircuitModule { }