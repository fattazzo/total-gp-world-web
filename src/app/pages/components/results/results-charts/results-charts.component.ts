import { Component, OnDestroy, Input } from '@angular/core';
import { Race } from '../../../../domain/race';
import { NbThemeService } from '@nebular/theme';
import { ChartBuilder, Group, ResultType, ChartBuilderType } from './builder/chart-builder';
import { ChartType, ChartTypes } from './chart-types';
import { TranslateService } from '@ngx-translate/core';
import { ChartFactory } from './builder/chart-factory';

@Component({
  selector: 'results-charts',
  templateUrl: './results-charts.component.html',
  styleUrls: ['./results-charts.component.scss']
})
export class ResultsChartsComponent implements OnDestroy {

  type$: ChartType = ChartTypes.POINTS;
  altTypes$ = [this.type$.type, this.type$.altType];

  currentTheme: string;
  themeSubscription: any;

  translationSubscription: any;

  options: any = {};
  data: any;
  ctype: any;

  private results$: Race[];

  constructor(private themeService: NbThemeService, public translate: TranslateService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

    this.translationSubscription = this.translate.onLangChange.subscribe(newLang => this.loadChart(this.type$.type))
  }

  @Input('type')
  set type(type: ChartType) {
    this.type$ = type;
    this.altTypes$ = [this.type$.type, this.type$.altType];
    this.loadChart(this.type$.type);
  }

  @Input('results')
  set results(results: Race[]) {
    this.results$ = results;
    this.loadChart(this.type$.type);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.translationSubscription.unsubscribe();
  }

  private loadChart(chartBuilderType: ChartBuilderType) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      let chartBuilder: ChartBuilder = ChartFactory.getBuilder(chartBuilderType, this.results$, Group.Driver, this.type$, this.translate, ResultType.Resul);

      if (chartBuilder != undefined) {
        this.data = chartBuilder.getData(config);
        this.options = chartBuilder.getOptions(config);
        this.ctype = chartBuilderType;
      }
    });
  }

  onTypeChange(type: string) {
    let cbt: ChartBuilderType

    switch (type) {
      case 'line': {
        cbt = ChartBuilderType.Line;
        break;
      }
      case 'pie': {
        cbt = ChartBuilderType.Pie;
        break;
      }
      case 'bar': {
        cbt = ChartBuilderType.Bar;
        break;
      }
      case 'doughnut': {
        cbt = ChartBuilderType.Doughnut;
        break;
      }
    }

    this.loadChart(cbt);
  }

}