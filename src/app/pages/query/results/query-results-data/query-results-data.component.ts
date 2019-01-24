import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MRData } from '../../../../domain/ergast/mrdata';
import { DataTableBuilderFactory } from './builders/data-table-builder-factory';
import { QueryService } from '../../../../services/query.service';
import { Column } from './models/column';

@Component({
  selector: 'query-results-data',
  templateUrl: './query-results-data.component.html',
  styleUrls: ['./query-results-data.component.scss'],
})
export class QueryResultsDataComponent implements OnInit {
  url = '';

  rowsPerPage = 0;
  totalRecords = 0;

  columns: Column[];
  pageDataItems: any[];

  @Output() pageLoading: EventEmitter<boolean> = new EventEmitter();

  constructor(private queryService: QueryService) {}

  ngOnInit() {}

  @Input('mrData')
  set info(value: MRData) {
    this.buildData(value);
  }

  loadDataLazy(event: any) {
    this.pageLoading.emit(true);
    const pageUrl = `${this.url}?limit=${event.rows}&offset=${event.first}`;

    this.queryService.search(pageUrl).subscribe(
      result => {
        this.buildData(result);
        this.pageLoading.emit(false);
      },
      error => this.pageLoading.emit(false),
    );
  }

  private buildData(mrData: MRData) {
    this.url = '';
    this.rowsPerPage = 0;
    this.totalRecords = 0;
    this.columns = [];
    this.pageDataItems = [];

    if (mrData) {
      this.rowsPerPage = mrData.limit;
      this.totalRecords = mrData.total;
      this.url = mrData.url;

      const tableBuilder = DataTableBuilderFactory.getBuilder(mrData);
      if (tableBuilder) {
        this.columns = tableBuilder.buildColunms(mrData);
        this.pageDataItems = tableBuilder.buildData(mrData);
      }
    }
  }
}
