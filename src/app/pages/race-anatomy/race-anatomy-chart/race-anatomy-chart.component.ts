import { Component, OnInit, Input } from '@angular/core';
import { Lap, Timing } from '../../../domain/lap';
import { PitStop } from '../../../domain/pitstop';
import { NbThemeService } from '@nebular/theme';
import { ChartBuilder } from './chart-builder';
import { TranslateService } from '@ngx-translate/core';
import { Result } from '../../../domain/result';
import { ImagesService } from '../../../services/images.service';
import { QualifyingResult } from '../../../domain/qualifying-result';

@Component({
  selector: 'race-anatomy-chart',
  templateUrl: './race-anatomy-chart.component.html',
  styleUrls: ['./race-anatomy-chart.component.scss'],
})
export class RaceAnatomyChartComponent implements OnInit {
  laps_: Lap[];
  pits_: PitStop[];
  results_: Result[];
  qualifying_: QualifyingResult[];

  imagesStatusItems: Map<string, string[]> = new Map();

  data: any;
  options: any = {};

  chartBuilder: ChartBuilder;

  chartColors: any;

  constructor(
    private themeService: NbThemeService,
    private translate: TranslateService,
    private imagesService: ImagesService,
  ) {
    this.themeService
      .getJsTheme()
      .subscribe(config => (this.chartColors = config.variables.chartBGColors))
      .unsubscribe();

    this.chartBuilder = new ChartBuilder(translate, imagesService);
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

  @Input('results')
  set results(values: Result[]) {
    this.results_ = values;
    this.buildChartData();
    this.buildImagesStatusItems();
  }

  @Input('qualifying')
  set qualifying(values: QualifyingResult[]) {
    this.qualifying_ = values;
    this.buildChartData();
  }

  private buildChartData() {
    this.data = this.chartBuilder.buildData(
      this.qualifying_,
      this.results_,
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

  private buildImagesStatusItems() {
    this.imagesStatusItems.clear();

    if (this.results_ !== undefined) {
      // retrive distinct status of results
      const status = this.results_
        .map(r => r.status)
        .filter((el, i, a) => i === a.indexOf(el));

      status.map(s => {
        const imagePath = this.imagesService.getFinishStatusImagePath(s);
        if (!this.imagesStatusItems.has(imagePath)) {
          this.imagesStatusItems.set(imagePath, []);
        }
        this.imagesStatusItems
          .get(imagePath)
          .push(this.translate.instant(`status.${s}`));
      });

      // add default status
      const defaultImagePath = this.imagesService.getDefaultImagePath();
      if (!this.imagesStatusItems.has(defaultImagePath)) {
        this.imagesStatusItems.set(defaultImagePath, []);
      }
      this.imagesStatusItems
        .get(defaultImagePath)
        .push(this.translate.instant(`status.Other`));

      // add pit stop
      this.imagesStatusItems.set(this.imagesService.getPitStopImagePath(), [
        'Pit Stop',
      ]);
    }
  }
}
