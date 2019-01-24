import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss'],
})
export class QueryResultsComponent implements OnInit {
  searchUrl_: string = '';
  searchResults: any;

  @Output()
  loadingDataChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private queryService: QueryService) {}

  ngOnInit() {}

  @Input('searchUrl')
  set searchUrl(url: string) {
    this.searchUrl_ = url;
    this.searchResults = '';

    if (url) {
      this.loadingDataChange.emit(true);
      this.queryService.search(url).subscribe(
        result => {
          this.searchResults = result;
          this.loadingDataChange.emit(false);
        },
        error => this.loadingDataChange.emit(false),
      );
    }
  }

  onPageLoading(value: boolean) {
    this.loadingDataChange.emit(value);
  }
}
