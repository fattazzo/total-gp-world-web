import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { DriversSelectionComponent } from './drivers-selection.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { NbTooltipModule } from '@nebular/theme';

@NgModule({
  declarations: [DriversSelectionComponent],
  imports: [
    ThemeModule,
    CommonModule,
    AutoCompleteModule,
    TranslateModule,
    NbTooltipModule,
  ],
  exports: [DriversSelectionComponent],
})
export class DriversSelectionModule {}
