import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { ConstructorStanding } from '../../../../domain/constructor-standing';
import { ConstructorsService } from '../../../../services/constructors.service';
import { SeasonsService } from '../../../../services/seasons.service';

@Component({
  selector: 'constructors-st-chart',
  templateUrl: './constructors-st-chart.component.html',
  styleUrls: [
    './constructors-st-chart.component.scss',
    '../constructors-st-table/constructors-st-table.component.scss',
  ],
})
export class ConstructorsStChartComponent implements OnDestroy {
  options: any = {};
  data: any;

  themeSubscription: any;

  loading = false;

  constructor(private theme: NbThemeService) {}

  @Input('standings')
  set standings(st: ConstructorStanding[]) {
    this.updateData(st);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateData(stands: ConstructorStanding[]) {
    this.loading = stands === undefined;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.options = this.builChartOptions(config);
      this.data = this.buildChartData(stands || [], config);
    });
  }

  private buildChartData(
    stands: ConstructorStanding[],
    config: NbJSThemeOptions,
  ): any {
    return {
      labels: stands.map(s => s.Constructor.name).slice(0, 5),
      datasets: [
        {
          data: stands.map(s => s.points).slice(0, 5),
          backgroundColor: config.variables.chartBGColors,
        },
      ],
    };
  }

  private builChartOptions(config: NbJSThemeOptions): any {
    const chartjs: any = config.variables.chartjs;

    return {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{ display: false }],
      },
      legend: {
        labels: { fontColor: chartjs.textColor },
        position: 'bottom',
      },
      layout: {
        padding: { left: 20, right: 20, top: 20, bottom: 20 },
      },
    };
  }
}
