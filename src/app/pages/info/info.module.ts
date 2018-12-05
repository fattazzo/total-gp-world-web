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
  declarations: [InfoComponent],
})
export class InfoModule {}
