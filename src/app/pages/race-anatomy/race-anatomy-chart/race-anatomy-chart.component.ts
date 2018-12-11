import { Component, OnInit, Input } from '@angular/core';
import { Lap, Timing } from '../../../domain/lap';
import { PitStop } from '../../../domain/pitstop';
import { NbThemeService } from '@nebular/theme';
import { ChartBuilder } from './chart-builder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'race-anatomy-chart',
  templateUrl: './race-anatomy-chart.component.html',
  styleUrls: ['./race-anatomy-chart.component.scss'],
})
export class RaceAnatomyChartComponent implements OnInit {
  laps_: Lap[];
  pits_: PitStop[];

  data: any;
  options: any = {};

  chartBuilder: ChartBuilder;

  chartColors: any;

  constructor(
    private themeService: NbThemeService,
    private translate: TranslateService,
  ) {
    this.themeService
      .getJsTheme()
      .subscribe(config => (this.chartColors = config.variables.chartBGColors))
      .unsubscribe();

    this.chartBuilder = new ChartBuilder(translate);
    this.options = this.chartBuilder.buildOptions();
  }

  ngOnInit() {}

  @Input('laps')
  set laps(values: Lap[]) {
    this.laps_ = values;
    this.buildChartData();
  }

  @Input('pits')
  set pits(values: PitStop[]) {
    this.pits_ = values;
    this.buildChartData();
  }

  private buildChartData() {
    this.data = this.chartBuilder.buildData(
      this.laps_,
      this.pits_,
      this.chartColors,
    );

    this.options.scales.yAxes[1].ticks.suggestedMin = 1;
    this.options.scales.yAxes[1].ticks.suggestedMax = 1;

    if (this.data.datasets.length > 0) {
      this.options.scales.yAxes[1].ticks.suggestedMax = this.data.datasets.length;
    }
  }
}
