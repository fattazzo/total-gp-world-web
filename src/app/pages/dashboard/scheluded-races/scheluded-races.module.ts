import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../../@theme/theme.module';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ScheludedRacesComponent } from './scheluded-races.component';
import { ScheduledRacesTableComponent } from './scheduled-races-table/scheduled-races-table.component';

import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    RouterModule,
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
