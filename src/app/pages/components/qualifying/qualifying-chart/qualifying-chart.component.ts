import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Race } from '../../../../domain/race';
import { NbThemeService } from '@nebular/theme';
import { ChartBuilder } from '../../results/results-charts/chart-builder';

@Component({
  selector: 'qualifying-chart',
  templateUrl: './qualifying-chart.component.html',
  styleUrls: ['./qualifying-chart.component.scss']
})
export class QualifyingChartComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  option: any;
  echartsIntance: any;

  private results$: Race[];

  constructor(private themeService: NbThemeService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  @Input('results')
  set results(results: Race[]) {
    this.results$ = results;
    this.loadChart();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  private loadChart() {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {
      const eTheme: any = config.variables.electricity;

      var data = this.buildSerieData();
      this.option = ChartBuilder.buildPieChartOptions("aaa", 'Position {b}<br># {c} ({d}%)', data, this.buildLegendData());
      this.resizeChart();
    });
  }

  private buildSerieData(): any[] {
    let occ = [];
    this.results$.forEach((race) => {
      occ[race.QualifyingResults[0].position] = occ[race.QualifyingResults[0].position] ? occ[race.QualifyingResults[0].position] + 1 : 1;
    })
    return occ.map((val, index) => ({ value: val, name: index }));
  }

  private buildLegendData(): any[] {
    return this.results$.map(race => race.QualifyingResults[0].position);
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }
}