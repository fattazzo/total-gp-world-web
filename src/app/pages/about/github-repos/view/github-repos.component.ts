import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubReposService } from '../service/github-repos.service';
import { GithubProjects, I18N } from '../model/github-projects';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
})
export class GithubReposComponent implements OnInit {
  projects$: Observable<GithubProjects>;

  constructor(
    private githubReposService: GithubReposService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.projects$ = this.githubReposService.getProjects();
  }

  getI18n(values: I18N[]): I18N {
    const currentLang = this.translate.currentLang.toUpperCase();

    let langI18N: I18N;
    let defI18N: I18N;

    values.forEach(i18n => {
      if (i18n.lang.toUpperCase() === currentLang) {
        langI18N = i18n;
      }
      if (i18n.lang.toUpperCase() === 'DEFAULT') {
        defI18N = i18n;
      }
    });

    if (!langI18N) {
      langI18N = defI18N;
    }

    return langI18N;
  }
}
