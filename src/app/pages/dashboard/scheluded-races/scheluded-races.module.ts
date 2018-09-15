import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';

import { ScheludedRacesComponent } from './scheluded-races.component';
import { ScheduledRacesTableComponent } from './scheduled-races-table/scheduled-races-table.component';

import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    RouterModule,
    TableModule,
    TranslateModule
  ],
  declarations: [
    ScheludedRacesComponent,
    ScheduledRacesTableComponent
  ],
  exports: [
    ScheludedRacesComponent,
    ScheduledRacesTableComponent
  ]
})
export class ScheludedRacesModule { }
