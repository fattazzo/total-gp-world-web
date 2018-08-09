import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ConstructorsService } from '../../../../services/constructors.service';
import { SeasonsService } from '../../../../services/seasons.service';

import { ConstructorStanding } from '../../../../domain/constructor-standing';

@Component({
  selector: 'constructors-st-chart',
  templateUrl: './constructors-st-chart.component.html',
  styleUrls: ['./constructors-st-chart.component.scss', '../constructor-standings.component.scss']
})
export class ConstructorsStChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private constructorsService: ConstructorsService, private seasonsService: SeasonsService) {
  }

  ngAfterViewInit() {
    this.seasonsService.getSeason()
      .subscribe((newSeason) => {
        console.log("Constructors Chart: loading season " + newSeason);
        this.constructorsService.getStandings(newSeason).subscribe(
          d => this.updateData(d)
        )
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateData(stands: ConstructorStanding[]) {
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