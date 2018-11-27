import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { UIChart } from 'primeng/components/chart/chart';
import { CapitalizePipe } from '../../../@theme/pipes';
import { Constructor } from '../../../domain/constructor';
import { Driver } from '../../../domain/driver';
import { Race } from '../../../domain/race';
import { ConstructorsService } from '../../../services/constructors.service';
import { DriversService } from '../../../services/drivers.service';
import { RacesService } from '../../../services/races.service';

@Component({
  selector: 'comparison-chart',
  templateUrl: './comparison-chart.component.html',
  styleUrls: ['./comparison-chart.component.scss'],
})
export class ComparisonChartComponent implements OnInit, OnDestroy {
  @Input() season: string;

  @ViewChild('chart') chart: UIChart;

  options: any = {};
  data: any = {
    labels: [],
    datasets: [],
  };

  themeSubscription: any;

  chartBGColors: any;

  loadingData = false;
  loadingMessage = 'Loading';

  cumulativeSumData = false;

  drivers_: Driver[];
  constructors_: Constructor[];

  constructor(
    private driversService: DriversService,
    private constructorsService: ConstructorsService,
    private racesService: RacesService,
    private theme: NbThemeService,
    private translate: TranslateService,
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.chartBGColors = config.variables.chartBGColors;
    });
  }

  ngOnInit() {
    this.options = {
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{ display: true }],
      },
      legend: {
        labels: { fontColor: 'gray' },
        position: 'top',
      },
      layout: {
        padding: { left: 20, right: 20, top: 20, bottom: 20 },
      },
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  @Input('drivers')
  set drivers(values: Driver[]) {
    this.drivers_ = values;
    this.buildDriversChart();
  }

  @Input('constructors')
  set constructors(values: Constructor[]) {
    this.constructors_ = values;
    this.buildConstructorsChart();
  }

  private setLoadingMessage(message: string = '') {
    this.loadingMessage = message;
    this.loadingData = message === '' ? false : true;
  }

  cumulativeSumDataChange(value: boolean) {
    this.cumulativeSumData = value;

    this.buildDriversChart();
    this.buildConstructorsChart();
  }

  private buildDriversChart() {
    if (this.drivers_ === undefined) {
      return;
    }
    this.data.labels = [];
    this.data.datasets = [];
    this.chart.refresh();

    this.racesService.getSchedule(this.season).subscribe(races => {
      this.data.labels = races.map(race => race.raceName);
    });

    this.drivers_.forEach(driver => {
      this.setLoadingMessage(
        `${new CapitalizePipe().transform(
          this.translate.instant('loading.data-for'),
        )} ${driver.givenName} ${driver.familyName}`,
      );
      this.driversService
        .getResults(this.season, driver.driverId)
        .subscribe(races => {
          try {
            this.data.datasets.push({
              label: `${races[0].Results[0].Driver.givenName} ${
                races[0].Results[0].Driver.familyName
              }`,
              data: this.buildDriversData(races),
              fill: true,
              borderColor: this.chartBGColors[this.data.datasets.length],
              backgroundColor: NbColorHelper.hexToRgbA(
                this.chartBGColors[this.data.datasets.length],
                0.3,
              ),
            });
            this.setLoadingMessage();
          } catch (error) {
            this.setLoadingMessage(
              `${new CapitalizePipe().transform(
                this.translate.instant('loading.data-for-error'),
              )} ${driver.givenName} ${driver.familyName}`,
            );
          } finally {
            this.chart.refresh();
          }
        });
    });
  }

  private buildDriversData(input: Race[]): any[] {
    let cumulArray = input.map(race => race.Results[0].points);

    if (this.cumulativeSumData) {
      cumulArray = [];
      let cumulativePoints = 0;
      input.forEach(race => {
        cumulativePoints = cumulativePoints + +race.Results[0].points;
        cumulArray.push(cumulativePoints);
      });
    }
    return cumulArray;
  }

  private buildConstructorsChart() {
    if (this.constructors_ === undefined) {
      return;
    }

    this.data.labels = [];
    this.data.datasets = [];
    this.chart.refresh();

    this.racesService.getSchedule(this.season).subscribe(races => {
      this.data.labels = races.map(race => race.raceName);
    });

    this.constructors_.forEach(constructor => {
      this.setLoadingMessage(
        `${new CapitalizePipe().transform(
          this.translate.instant('loading.data-for'),
        )} ${constructor.name}`,
      );
      this.constructorsService
        .getResults(this.season, constructor.constructorId)
        .subscribe(races => {
          try {
            this.data.datasets.push({
              label: races[0].Results[0].Constructor.name,
              data: this.buildConstructorsData(Object.assign([], races)),
              fill: true,
              borderColor: this.chartBGColors[this.data.datasets.length],
              backgroundColor: NbColorHelper.hexToRgbA(
                this.chartBGColors[this.data.datasets.length],
                0.3,
              ),
            });
            this.setLoadingMessage();
          } catch (error) {
            this.setLoadingMessage(
              `${new CapitalizePipe().transform(
                this.translate.instant('loading.data-for-error'),
              )} ${constructor.name}`,
            );
          } finally {
            this.chart.refresh();
          }
        });
    });
  }

  private buildConstructorsData(input: Race[]): any[] {
    let cumulArray = [];
    const tmpArray = input.map(race =>
      race.Results.reduce((a, b) => a + +b['points'], 0),
    );

    if (this.cumulativeSumData) {
      cumulArray = [];
      let cumulativePoints = 0;
      tmpArray.forEach(p => {
        cumulativePoints = cumulativePoints + p;
        cumulArray.push(cumulativePoints);
      });
    } else {
      cumulArray = tmpArray;
    }
    return cumulArray;
  }
}
