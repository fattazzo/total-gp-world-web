import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { DriversSelectionComponent } from './drivers-selection.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [DriversSelectionComponent],
  imports: [ThemeModule, CommonModule, AutoCompleteModule],
  exports: [DriversSelectionComponent],
})
export class DriversSelectionModule {}
