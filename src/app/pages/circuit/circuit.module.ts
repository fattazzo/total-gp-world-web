import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { CircuitComponent } from './circuit.component';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { CircuitRoutingModule } from './circuit-routing.module';

import { DropdownModule } from 'primeng/dropdown';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';
import { ResultsModule } from '../components/results/results.module';
import { SeasonsModule } from '../components/seasons/seasons.module';

@NgModule({
  imports: [
    ThemeModule,
    WikipediaPageModule,
    CircuitRoutingModule,
    DropdownModule,
    ApplicationPipesModule,
    ResultsModule,
    SeasonsModule,
  ],
  declarations: [
    CircuitComponent,
  ],
})
export class CircuitModule { }
