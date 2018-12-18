import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from '../../../services/query.service';

@Component({
  selector: 'query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss'],
})
export class QueryResultsComponent implements OnInit {
  searchUrl_: string = '';
  searchResults: any;

  constructor(private queryService: QueryService) {}

  ngOnInit() {}

  @Input('searchUrl')
  set searchUrl(url: string) {
    this.searchUrl_ = url;

    this.searchResults = '';
    if (url)
      this.queryService.search(url).subscribe(result => {
        this.searchResults = result;
      });
  }
}
