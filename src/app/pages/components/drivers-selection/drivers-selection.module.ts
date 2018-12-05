import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { DriversSelectionComponent } from './drivers-selection.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { NbTooltipModule } from '@nebular/theme';
import { MultiSelectModule } from 'primeng/multiselect';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DriversSelectionComponent],
  imports: [
    ThemeModule,
    CommonModule,
    AutoCompleteModule,
    TranslateModule,
    NbTooltipModule,
    MultiSelectModule,
    FontAwesomeModule,
  ],
  exports: [DriversSelectionComponent],
})
export class DriversSelectionModule {}
