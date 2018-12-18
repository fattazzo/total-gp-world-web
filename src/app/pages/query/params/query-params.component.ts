import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.scss'],
})
export class QueryParamsComponent implements OnInit {
  resultsSearchUrl: string = '';
  standingsSearchUrl: string = '';

  @Output() searchUrlChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  resultsSearchUrlChange(url: string) {
    this.resultsSearchUrl = url;
    this.standingsSearchUrl = '';
    this.fireSearchUrlChange();
  }

  standingsSearchUrlChange(url: string) {
    this.standingsSearchUrl = url;
    this.resultsSearchUrl = '';
    this.fireSearchUrlChange();
  }

  private fireSearchUrlChange() {
    // Only 1 url is not empty
    this.searchUrlChange.emit(this.standingsSearchUrl + this.resultsSearchUrl);
  }
}
