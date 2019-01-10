import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { ThemeModule } from '../../@theme/theme.module';
import { GalleriaModule } from 'primeng/galleria';
import { GithubReleasesModule } from '../components/github/github-releases/github-releases.module';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule } from '@nebular/theme';
import { InfoReleasesComponent } from './info-releases/info-releases.component';
import { InfoThanksComponent } from './info-thanks/info-thanks.component';
import { InfoAndroidComponent } from './info-android/info-android.component';
import { InfoHelpCollaborationComponent } from './info-help-collaboration/info-help-collaboration.component';
import { InfoFaqComponent } from './info-faq/info-faq.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    InfoRoutingModule,
    GalleriaModule,
    GithubReleasesModule,
    TranslateModule,
    FontAwesomeModule,
    NbButtonModule,
  ],
  declarations: [InfoComponent, InfoReleasesComponent, InfoThanksComponent, InfoAndroidComponent, InfoHelpCollaborationComponent, InfoFaqComponent],
})
export class InfoModule {}
