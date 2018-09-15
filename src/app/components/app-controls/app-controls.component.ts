import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-controls',
  templateUrl: './app-controls.component.html',
  styleUrls: ['./app-controls.component.scss'],
})
export class AppControlsComponent implements OnInit, OnDestroy {

  private alive = true;

  currentTheme: string;

  currentLang: string;
  langSubscribe: any;

  constructor(public translate: TranslateService, private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.langSubscribe = translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang
    })
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
  }

  ngOnDestroy() {
    this.alive = false;
    this.langSubscribe.unsubscribe();
  }

  onLangChange(lang: string) {
    this.translate.use(lang)
    this.currentLang = lang;
  }

}
