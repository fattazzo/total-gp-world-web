import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { of, Observable } from 'rxjs';
import { NbThemeService } from '@nebular/theme';
import { DriversService } from '../../../../../services/drivers.service';
import { Race } from '../../../../../domain/race';
import { ChartBuilder } from './chart-builder';

@Component({
  selector: 'driver-results-charts',
  templateUrl: './driver-results-charts.component.html',
  styleUrls: ['./driver-results-charts.component.scss']
})
export class DriverResultsChartsComponent implements OnDestroy {

  type$ = 'Points';
  types = ['Points', 'Grid', 'Position'];

  currentTheme: string;
  themeSubscription: any;

  option: any;
  echartsIntance: any;

  private results$: Race[];

  constructor(private driversService: DriversService, private themeService: NbThemeService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  @Input('type')
  set type(type: string) {
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
  }

  private loadChart() {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {
      const eTheme: any = config.variables.electricity;

      var data = this.buildSerieData();

      if (this.type$ === this.types[0]) {
        var xdata = this.results$.map(race => race.raceName);
        this.option = ChartBuilder.buildBarChartOptions(eTheme, this.type$, data, xdata);
      } else {
        this.option = ChartBuilder.buildPieChartOptions(this.type$, 'Position {b}<br># {c} ({d}%)', data, this.buildLegendData());
      }

      this.resizeChart();
    });
  }

  private buildSerieData(): any[] {
    switch (this.type$) {
      case this.types[0]: {
        return this.results$.map(race => race.Results[0].points);
      }
      case this.types[1]: {
        let occ = [];
        this.results$.forEach((race) => {
          occ[race.Results[0].grid] = occ[race.Results[0].grid] ? occ[race.Results[0].grid] + 1 : 1;
        })
        return occ.map((val, index) => ({ value: val, name: index }));
      }
      case this.types[2]: {
        let occ = [];
        this.results$.forEach((race) => {
          occ[race.Results[0].position] = occ[race.Results[0].position] ? occ[race.Results[0].position] + 1 : 1;
        })
        return occ.map((val, index) => ({ value: val, name: index }));
      }
      default: {
        return this.results$.map(race => race.Results[0].points);
      }
    }
  }

  private buildLegendData(): any[] {
    switch (this.type$) {
      case this.types[1]: {
        return this.results$.map(race => race.Results[0].grid);
      }
      case this.types[2]: {
        return this.results$.map(race => race.Results[0].position);
      }
      default: {
        return [];
      }
    }
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