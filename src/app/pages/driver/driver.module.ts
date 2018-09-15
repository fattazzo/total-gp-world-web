import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';
import { DriverComponent } from './driver.component';

import { WikipediaPageModule } from '../components/wikipedia-page/wikipedia-page.module'
import { DriverRoutingModule } from './driver-routing.module';
import { ResultsModule } from '../components/results/results.module';
import { QualifyingModule } from '../components/qualifying/qualifying.module';
import { DropdownModule } from 'primeng/dropdown';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        WikipediaPageModule,
        DriverRoutingModule,
        ResultsModule,
        QualifyingModule,
        DropdownModule,
        ApplicationPipesModule
    ],
    declarations: [
        DriverComponent
    ],
})
export class DriverModule { }
