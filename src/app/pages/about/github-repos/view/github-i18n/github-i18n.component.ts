import { Component, OnInit, Input } from '@angular/core';
import { I18N } from '../../model/github-projects';

@Component({
  selector: 'github-i18n',
  templateUrl: './github-i18n.component.html',
  styleUrls: ['./github-i18n.component.scss'],
})
export class GithubI18nComponent implements OnInit {
  @Input()
  i18n: I18N;

  @Input()
  icon: string;

  constructor() {}

  ngOnInit() {}
}
