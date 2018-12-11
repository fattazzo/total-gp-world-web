import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceAnatomyComponent } from './race-anatomy.component';
import { RaceAnatomyRoutingModule } from './race-anatomy-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RaceSelectionModule } from '../components/race-selection/race-selection.module';
import { RaceAnatomyInfoComponent } from './race-anatomy-info/race-anatomy-info.component';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RaceAnatomyLapsTableComponent } from './race-anatomy-laps-table/race-anatomy-laps-table.component';
import { RaceAnatomyPitsTableComponent } from './race-anatomy-pits-table/race-anatomy-pits-table.component';
import { NbAccordionModule } from '@nebular/theme';
import { RaceAnatomyChartComponent } from './race-anatomy-chart/race-anatomy-chart.component';
import { ChartModule } from 'primeng/chart';
import { RaceAnatomyResultsComponent } from './race-anatomy-results/race-anatomy-results.component';
import { RaceAnatomyQualifyingComponent } from './race-anatomy-qualifying/race-anatomy-qualifying.component';

@NgModule({
  declarations: [
    RaceAnatomyComponent,
    RaceAnatomyInfoComponent,
    RaceAnatomyLapsTableComponent,
    RaceAnatomyPitsTableComponent,
    RaceAnatomyChartComponent,
    RaceAnatomyResultsComponent,
    RaceAnatomyQualifyingComponent,
  ],
  imports: [
    RaceAnatomyRoutingModule,
    ThemeModule,
    CommonModule,
    TranslateModule,
    RaceSelectionModule,
    TableModule,
    FontAwesomeModule,
    NbAccordionModule,
    ChartModule,
  ],
})
export class RaceAnatomyModule {}
