import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';

import { ScheludedRacesComponent } from './scheluded-races.component';
import { ScheduledRacesTableComponent } from './scheduled-races-table/scheduled-races-table.component';

import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { StatusCardModule } from '../../components/status-card/status-card.module';

@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
    TableModule,
    TranslateModule,
    StatusCardModule,
  ],
  declarations: [ScheludedRacesComponent, ScheduledRacesTableComponent],
  exports: [ScheludedRacesComponent, ScheduledRacesTableComponent],
})
export class ScheludedRacesModule {}
