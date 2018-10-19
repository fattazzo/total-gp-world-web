import { NgModule } from '@angular/core';
import { StatusCardComponent } from './status-card.component';
import { ApplicationPipesModule } from '../../../pipes/application-pipes.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [ThemeModule, TranslateModule, ApplicationPipesModule],
  declarations: [StatusCardComponent],
  exports: [StatusCardComponent],
})
export class StatusCardModule {}
