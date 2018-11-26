import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Driver } from '../../../domain/driver';
import { DriversService } from '../../../services/drivers.service';
import { RacesService } from '../../../services/races.service';
import { Circuit } from '../../../domain/circuit';
import { UIChart } from 'primeng/components/chart/chart';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { Constructor } from '../../../domain/constructor';
import { ConstructorsService } from '../../../services/constructors.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CapitalizePipe } from '../../../@theme/pipes';

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
    if (values === undefined) {
      return;
    }
    this.data.labels = [];
    this.data.datasets = [];
    this.chart.refresh();

    this.racesService.getSchedule(this.season).subscribe(races => {
      this.data.labels = races.map(race => race.raceName);
    });

    values.forEach(driver => {
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
              data: races.map(race => race.Results[0].points),
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

  @Input('constructors')
  set constructors(values: Constructor[]) {
    if (values === undefined) {
      return;
    }

    this.data.labels = [];
    this.data.datasets = [];
    this.chart.refresh();

    this.racesService.getSchedule(this.season).subscribe(races => {
      this.data.labels = races.map(race => race.raceName);
    });

    values.forEach(constructor => {
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
              data: races.map(race =>
                race.Results.reduce((a, b) => a + b['points']++, 0),
              ),
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

  private setLoadingMessage(message: string = '') {
    this.loadingMessage = message;
    this.loadingData = message === '' ? false : true;
  }
}
