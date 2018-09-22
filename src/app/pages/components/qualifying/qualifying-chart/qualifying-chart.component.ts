import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Race } from '../../../../domain/race';
import { NbThemeService } from '@nebular/theme';
import { PieChartBuilder } from '../../results/results-charts/builder/pie-chart-builder';
import { Group, ResultType } from '../../results/results-charts/builder/chart-builder';
import { ChartTypes, ChartType } from '../../results/results-charts/chart-types';
import { TranslateService } from '@ngx-translate/core';
import { DoughnutChartBuilder } from '../../results/results-charts/builder/doughnut-chart-builder';

@Component({
  selector: 'qualifying-chart',
  templateUrl: './qualifying-chart.component.html',
  styleUrls: ['./qualifying-chart.component.scss']
})
export class QualifyingChartComponent implements OnDestroy {

  type$: ChartType = ChartTypes.POSITIONS;

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

      var chartBuilder = new DoughnutChartBuilder(this.results$, Group.Driver, this.type$, this.translate, ResultType.Qualify);
      this.data = chartBuilder.getData(config);
      this.options = chartBuilder.getOptions(config);
      this.chartType = chartBuilder.getType();
    });
  }
}