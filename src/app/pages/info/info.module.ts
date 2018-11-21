import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { ThemeModule } from '../../@theme/theme.module';
import { GalleriaModule } from 'primeng/galleria';
import { GithubReleasesModule } from '../components/github/github-releases/github-releases.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    InfoRoutingModule,
    GalleriaModule,
    GithubReleasesModule,
    TranslateModule,
  ],
  declarations: [InfoComponent],
})
export class InfoModule {}
