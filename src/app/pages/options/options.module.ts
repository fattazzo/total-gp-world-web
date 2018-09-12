import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';


import { ThemeModule } from '../../@theme/theme.module';

import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { TranslateModule } from '@ngx-translate/core';

import { OptionsComponent } from './options.component';
import { ThemesSwitcherComponent } from './themes-switcher/themes-switcher.component';
import { OptionsRoutingModule } from './options-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    CdkTableModule,
    MatTableModule,
    TranslateModule,
    OptionsRoutingModule
  ],
  declarations: [
    OptionsComponent,
    ThemesSwitcherComponent
  ]
})
export class OptionsModule { }
