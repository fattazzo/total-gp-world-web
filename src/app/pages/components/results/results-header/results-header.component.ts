import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ChartType, ChartTypes } from '../results-charts/chart-types';

@Component({
  selector: 'results-header',
  templateUrl: './results-header.component.html',
  styleUrls: ['./results-header.component.scss']
})
export class ResultsHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() typeChange = new EventEmitter<ChartType>();

  @Input() type: ChartType = ChartTypes.POINTS;
  types = [ChartTypes.POINTS, ChartTypes.GRID, ChartTypes.POSITIONS];

  @Input() showTypesControl = false

  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  changeType(typeParam: ChartType): void {
    this.type = typeParam;
    this.typeChange.emit(typeParam);
  }

}