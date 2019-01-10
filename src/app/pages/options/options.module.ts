import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { TranslateModule } from '@ngx-translate/core';

import { OptionsComponent } from './options.component';
import { ThemesSwitcherComponent } from './themes-switcher/themes-switcher.component';
import { OptionsRoutingModule } from './options-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbTooltipModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    TranslateModule,
    OptionsRoutingModule,
    FontAwesomeModule,
    NbTooltipModule,
  ],
  declarations: [OptionsComponent, ThemesSwitcherComponent],
})
export class OptionsModule {}
