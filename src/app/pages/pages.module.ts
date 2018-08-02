import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DriversComponent } from './drivers/drivers.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { CircuitsComponent } from './circuits/circuits.component';

import { TreeComponent } from './components/tree/tree.component'
import { TemperatureDraggerComponent } from './dashboard/temperature/temperature-dragger/temperature-dragger.component'

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NgxEchartsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DriversComponent,
    ConstructorsComponent,
    CircuitsComponent,
    TreeComponent,
    TemperatureDraggerComponent,
  ],
})
export class PagesModule {
}
