import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { DriverModule } from './sections/driver/driver.module';
import { ConstructorModule } from './sections/constructor/constructor.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    DriverModule,
    ConstructorModule,
    MiscellaneousModule,
    NgxEchartsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
