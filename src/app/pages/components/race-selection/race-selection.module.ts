import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceSelectionComponent } from './race-selection.component';
import { DropdownModule } from 'primeng/dropdown';
import { ApplicationPipesModule } from '../../../pipes/application-pipes.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RaceSelectionComponent],
  imports: [
    ThemeModule,
    CommonModule,
    DropdownModule,
    ApplicationPipesModule,
    TranslateModule,
  ],
  exports: [RaceSelectionComponent],
})
export class RaceSelectionModule {}
