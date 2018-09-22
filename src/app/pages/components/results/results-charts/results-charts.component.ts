import { Component, OnDestroy, Input } from '@angular/core';
import { Race } from '../../../../domain/race';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { ChartBuilder, Group, ResultType } from './builder/chart-builder';
import { PieChartBuilder } from './builder/pie-chart-builder';
import { DoughnutChartBuilder } from './builder/doughnut-chart-builder';
import { BarChartBuilder } from './builder/bar-chart-builder';
import { LineChartBuilder } from './builder/line-chart-builder';

import { MenuItem } from 'primeng/api';
import { ChartType, ChartTypes } from './chart-types';
import { ChartData } from './builder/chart-data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'results-charts',
  templateUrl: './results-charts.component.html',
  styleUrls: ['./results-charts.component.scss']
})
export class ResultsChartsComponent implements OnDestroy {

  type$: ChartType = ChartTypes.POINTS;

  currentTheme: string;
  themeSubscription: any;

  translationSubscription: any;

  options: any = {};
  data: any;
  chartType: string;

  private results$: Race[];

  constructor(private themeService: NbThemeService, public translate: TranslateService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

    this.translationSubscription = this.translate.onLangChange.subscribe(newLang => this.loadChart())
  }

  @Input('type')
  set type(type: ChartType) {
    this.type$ = type;
    this.loadChart();
  }

  @Input('results')
  set results(results: Race[]) {
    this.results$ = results;
    this.loadChart();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.translationSubscription.unsubscribe();
  }

  private loadChart() {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      let chartBuilder: ChartBuilder = undefined;
      switch (this.type$) {
        case ChartTypes.POINTS: {
          chartBuilder = new LineChartBuilder(this.results$, Group.Driver, this.type$, this.translate, ResultType.Resul);
          break;
        }
        case ChartTypes.GRID: {
          chartBuilder = new DoughnutChartBuilder(this.results$, Group.Driver, this.type$, this.translate, ResultType.Resul);
          break;
        }
        case ChartTypes.POSITIONS: {
          chartBuilder = new PieChartBuilder(this.results$, Group.Driver, this.type$, this.translate, ResultType.Resul);
          break;
        }
      }

      if (chartBuilder != undefined) {
        this.data = chartBuilder.getData(config);
        this.options = chartBuilder.getOptions(config);
        this.chartType = chartBuilder.getType();
      }
    });
  }

}