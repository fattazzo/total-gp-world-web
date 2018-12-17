import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryComponent } from './query.component';
import { QueryRoutingModule } from './query-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { RaceResultsComponent } from './params/race-results/race-results.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [QueryComponent, RaceResultsComponent],
  imports: [
    CommonModule,
    ThemeModule,
    QueryRoutingModule,
    FormsModule,
    DropdownModule,
    NbButtonModule,
  ],
})
export class QueryModule {}
