import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DriversService } from '../../../../services/drivers.service';
import { SeasonsService } from '../../../../services/seasons.service';

import { DriverStanding } from '../../../../domain/driver-standing';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'drivers-st-chart',
  templateUrl: './drivers-st-chart.component.html',
  styleUrls: [
    './drivers-st-chart.component.scss',
    '../drivers-st-table/drivers-st-table.component.scss',
  ],
})
export class DriversStChartComponent implements OnDestroy {
  options: any = {};
  data: any;

  themeSubscription: any;

  loading = true;

  constructor(private theme: NbThemeService) {}

  @Input('standings')
  set standings(st: DriverStanding[]) {
    this.updateData(st);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateData(stands: DriverStanding[]) {
    this.loading = stands === undefined;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.options = this.builChartOptions(config);
      this.data = this.buildChartData(stands || [], config);
    });
  }

  private buildChartData(
    stands: DriverStanding[],
    config: NbJSThemeOptions,
  ): any {
    return {
      labels: stands
        .map(s => s.Driver.givenName + '\n' + s.Driver.familyName)
        .slice(0, 5),
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
