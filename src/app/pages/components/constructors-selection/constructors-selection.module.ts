import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorsSelectionComponent } from './constructors-selection.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbTooltipModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ConstructorsSelectionComponent],
  imports: [
    ThemeModule,
    CommonModule,
    AutoCompleteModule,
    TranslateModule,
    NbTooltipModule,
    MultiSelectModule,
    FontAwesomeModule,
  ],
  exports: [ConstructorsSelectionComponent],
})
export class ConstructorsSelectionModule {}
