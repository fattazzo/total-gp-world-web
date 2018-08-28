import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DriversService } from '../../../../services/drivers.service';
import { SeasonsService } from '../../../../services/seasons.service';

import { DriverStanding } from '../../../../domain/driver-standing';

@Component({
  selector: 'drivers-st-chart',
  templateUrl: './drivers-st-chart.component.html',
  styleUrls: ['./drivers-st-chart.component.scss', '../drivers-st-table/drivers-st-table.component.scss']
})
export class DriversStChartComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;

  loading = true;

  constructor(private theme: NbThemeService) { }

  @Input('standings')
  set standings(st: DriverStanding[]) {
    this.updateData(st);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateData(stands: DriverStanding[]) {
    this.loading = stands === undefined || stands.length === 0
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{b}\n{c} ({d}%)',
          confine: true,
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: 'bottom',
          confine: true,
          data: [],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Drivers',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              position: 'inside',
              color: echarts.textColor,

            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };

      this.options.legend.data = stands.map(s => s.Driver.givenName + '\n' + s.Driver.familyName).slice(0, 5);
      var tmp = [];
      stands.forEach(function (stand) {
        tmp.push({ value: stand.points, name: (stand.Driver.givenName + '\n' + stand.Driver.familyName) });
      })
      this.options.series[0].data = tmp.slice(0, 5);
    });
  }
}