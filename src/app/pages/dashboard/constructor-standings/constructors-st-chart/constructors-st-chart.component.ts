import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ConstructorsService } from '../../../../services/constructors.service';
import { SeasonsService } from '../../../../services/seasons.service';

import { ConstructorStanding } from '../../../../domain/constructor-standing';

@Component({
  selector: 'constructors-st-chart',
  templateUrl: './constructors-st-chart.component.html',
  styleUrls: ['./constructors-st-chart.component.scss', '../constructors-st-table/constructors-st-table.component.scss']
})
export class ConstructorsStChartComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;

  loading = true;

  constructor(private theme: NbThemeService, private constructorsService: ConstructorsService, private seasonsService: SeasonsService) {
  }

  @Input('standings')
  set standings(st: ConstructorStanding[]) {
    this.updateData(st);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateData(stands: ConstructorStanding[]) {
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
            name: 'Constructors',
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

      this.options.legend.data = stands.map(s => s.Constructor.name).slice(0, 5);
      var tmp = [];
      stands.forEach(function (stand) {
        tmp.push({ value: stand.points, name: stand.Constructor.name });
      })
      this.options.series[0].data = tmp.slice(0, 5);
    });
  }
}