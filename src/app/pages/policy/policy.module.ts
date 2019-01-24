import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [PolicyComponent, CookieComponent, PrivacyComponent],
  imports: [ThemeModule, CommonModule, PolicyRoutingModule],
})
export class PolicyModule {}
