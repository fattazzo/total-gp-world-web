import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
})
export class QueryComponent implements OnInit {
  searchUrl: string = '';

  showParams = true;

  constructor() {}

  ngOnInit() {}

  onSearchUrlChange(url: string) {
    this.searchUrl = url;

    this.showParams = true;

    if (url) {
      // this.showParams = true;
      setTimeout(() => (this.showParams = false), 0);
    }
  }
}
