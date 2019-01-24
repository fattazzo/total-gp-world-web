import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryComponent } from './query.component';
import { QueryRoutingModule } from './query-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { RaceResultsComponent } from './params/race-results/race-results.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NbButtonModule, NbAccordionModule } from '@nebular/theme';
import { QueryParamsComponent } from './params/query-params.component';
import { QueryResultsComponent } from './results/query-results.component';
import { SlideOutComponent } from '../../components/slide-out/slide-out.component';
import { QueryResultsInfoComponent } from './results/query-results-info/query-results-info.component';
import { TableModule } from 'primeng/table';
import { QueryResultsDataComponent } from './results/query-results-data/query-results-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StandingsComponent } from './params/standings/standings.component';
import { NbSpinnerModule } from '@nebular/theme/components/spinner/spinner.module';

@NgModule({
  declarations: [
    QueryComponent,
    RaceResultsComponent,
    QueryParamsComponent,
    QueryResultsComponent,
    SlideOutComponent,
    QueryResultsInfoComponent,
    QueryResultsDataComponent,
    StandingsComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    QueryRoutingModule,
    FormsModule,
    DropdownModule,
    NbButtonModule,
    NbAccordionModule,
    NbSpinnerModule,
    TableModule,
    TranslateModule,
    FontAwesomeModule,
  ],
})
export class QueryModule {}
