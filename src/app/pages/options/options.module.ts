import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { TranslateModule } from '@ngx-translate/core';

import { OptionsComponent } from './options.component';
import { ThemesSwitcherComponent } from './themes-switcher/themes-switcher.component';
import { OptionsRoutingModule } from './options-routing.module';

@NgModule({
  imports: [ThemeModule, TranslateModule, OptionsRoutingModule],
  declarations: [OptionsComponent, ThemesSwitcherComponent],
})
export class OptionsModule {}
