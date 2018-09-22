import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { ConstructorComponent } from './constructor.component';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { ConstructorRoutingModule } from './constructor-routing.module';
import { ResultsModule } from '../components/results/results.module';
import { QualifyingModule } from '../components/qualifying/qualifying.module';

import { DropdownModule } from 'primeng/dropdown';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';


@NgModule({
    imports: [
        ThemeModule,
        WikipediaPageModule,
        ConstructorRoutingModule,
        ResultsModule,
        QualifyingModule,
        DropdownModule,
        ApplicationPipesModule
    ],
    declarations: [
        ConstructorComponent
    ],
})
export class ConstructorModule { }
