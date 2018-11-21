import { NgModule } from '@angular/core';
import { StatusCardComponent } from './status-card.component';
import { ApplicationPipesModule } from '../../../pipes/application-pipes.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    ThemeModule,
    TranslateModule,
    ApplicationPipesModule,
    FontAwesomeModule,
  ],
  declarations: [StatusCardComponent],
  exports: [StatusCardComponent],
})
export class StatusCardModule {}
