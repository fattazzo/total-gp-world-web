import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { DriversService } from '../../../../services/drivers.service';
import { Race } from '../../../../domain/race';
import { Observable, of } from 'rxjs';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, delay } from 'rxjs/operators';

@Component({
  selector: 'driver-results-chart',
  templateUrl: './driver-results-chart.component.html',
  styleUrls: ['./driver-results-chart.component.scss']
})
export class DriverResultsChartComponent implements OnDestroy, OnInit {

  private _driverId: string;
  private _season: string;

  public results: Observable<Race[]>;

  type = 'Points';
  types = ['Points', 'Grid', 'Position'];

  currentTheme: string;
  themeSubscription: any;

  private alive = true;

  option: any;
  echartsIntance: any;
  races: Race[];

  constructor(private driversService: DriversService, private themeService: NbThemeService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.results.subscribe(
      races => {
        this.races = races;
        this.loadChart()
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
    this.themeSubscription.unsubscribe();
  }

  @Input('season')
  set season(season: string) {
    this._season = season;
    this.loadResults();
  }

  @Input('driverId')
  set driverId(driverId: string) {
    this._driverId = driverId;
    this.loadResults();
  }

  private loadResults() {
    this.results = of();

    if (this._season != undefined && this._driverId != undefined) {
      this.results = this.driversService.getResults(this._season, this._driverId);
    }
  }

  changeDataType(newType: string) {
    this.type = newType;
    this.loadChart();
  }

  private loadChart() {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {
      const eTheme: any = config.variables.electricity;

      this.option = {
        grid: { left: 20, top: 0, right: 20, bottom: 20, },
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: eTheme.tooltipLineColor,
              width: eTheme.tooltipLineWidth,
            },
          },
          textStyle: {
            color: eTheme.tooltipTextColor,
            fontSize: 20,
            fontWeight: eTheme.tooltipFontWeight,
          },
          position: 'top',
          backgroundColor: eTheme.tooltipBg,
          borderColor: eTheme.tooltipBorderColor,
          borderWidth: 3,
          formatter: '{b}<br>' + this.type + ' {c0}',
          extraCssText: eTheme.tooltipExtraCss,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          offset: 0,
          data: this.races.map(race => race.raceName),
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: eTheme.xAxisTextColor,
            fontSize: 18,
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '2',
            },
          },
        },
        yAxis: {
          boundaryGap: [0, '5%'],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: eTheme.yAxisSplitLine,
              width: '1',
            },
          },
        },
        series: [


          {
            type: 'bar',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.shadowLineDarkBg,
                shadowBlur: 14,
                opacity: 1,
              },
            },
            data: this.races.map(race => {
              switch (this.type) {
                case this.types[0]: {
                  return race.Results[0].points
                }
                case this.types[1]: {
                  return race.Results[0].grid
                }
                case this.types[2]: {
                  return race.Results[0].position
                }
                default: {
                  return race.Results[0].points
                }
              }
            }),
          },
        ],
      };
    });
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