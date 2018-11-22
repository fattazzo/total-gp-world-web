import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ComparisonRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './comparison.component';
import { DriversSelectionModule } from '../components/drivers-selection/drivers-selection.module';

@NgModule({
  declarations: [ComparisonComponent],
  imports: [
    ThemeModule,
    CommonModule,
    ComparisonRoutingModule,
    NbSelectModule,
    TranslateModule,
    DriversSelectionModule,
  ],
})
export class ComparisonModule {}
