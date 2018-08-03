import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DriversService } from '../../../../services/drivers.service';

import { DriverStanding } from '../../../../domain/driver-standing';

@Component({
  selector: 'drivers-st-chart',
  templateUrl: './drivers-st-chart.component.html',
  styleUrls: ['./drivers-st-chart.component.scss']
})
export class DriversStChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  standings : DriverStanding[] = [];

  constructor(private theme: NbThemeService, private driversService: DriversService) {
  }

  ngAfterViewInit() {
    this.getStandings();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  public getStandings() : void {
    //console.log(this.dataService.getSeasons());

    this.driversService
            .getStandings("current")
            .subscribe(
            result => {
              console.log('Risultato: ' + result.length);
              //this.standings = result;

              if(result == undefined || result.length == 0) {
                this.standings = [];
              } else {
                var tmp : DriverStanding[] = [];
                result.forEach( (element) => {
                  tmp.push(new DriverStanding(element))
                });
                this.standings = tmp;
              }
              this.updateData();
            },
            error => () => {
              console.log('Something went wrong...');
            },
            () => {
              console.log('Getting all values complete');
            });
  }

  private updateData() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      console.log(this.standings.map(s => s.Driver.givenName).slice(0,4));

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
          data : [],
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
              position : 'inside',
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

      this.options.legend.data = this.standings.map(s => s.Driver.givenName + '\n' + s.Driver.familyName).slice(0,5);
      var tmp = [];
      this.standings.forEach(function (stand) {
        tmp.push({ value: stand.points, name: (stand.Driver.givenName + '\n' + stand.Driver.familyName) });
      })
      this.options.series[0].data = tmp.slice(0,5);
    });
  }
}