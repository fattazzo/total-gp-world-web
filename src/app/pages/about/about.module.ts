import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { GithubProfileComponent } from './github-profile/view/github-profile.component';
import { ThemeModule } from '../../@theme/theme.module';
import { GithubReposComponent } from './github-repos/view/github-repos.component';
import { TranslateModule } from '@ngx-translate/core';
import { GithubI18nComponent } from './github-repos/view/github-i18n/github-i18n.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectButtonComponent } from './github-repos/view/project-button/project-button.component';
import { ProfileButtonComponent } from './github-profile/view/profile-button/profile-button.component';

@NgModule({
  imports: [
    ThemeModule,
    AboutRoutingModule,
    TranslateModule,
    FontAwesomeModule,
  ],
  declarations: [
    AboutComponent,
    GithubProfileComponent,
    GithubReposComponent,
    GithubI18nComponent,
    ProjectButtonComponent,
    ProfileButtonComponent,
  ],
})
export class AboutModule {}
