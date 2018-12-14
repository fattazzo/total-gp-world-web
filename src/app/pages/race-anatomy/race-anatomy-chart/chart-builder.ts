import { Lap, Timing } from '../../../domain/lap';
import { PitStop } from '../../../domain/pitstop';
import { TranslateService } from '@ngx-translate/core';
import { Result } from '../../../domain/result';
import { ImagesService } from '../../../services/images.service';
import { QualifyingResult } from '../../../domain/qualifying-result';

export class ChartBuilder {
  private translate: TranslateService;
  private imagesService: ImagesService;

  constructor(translate: TranslateService, imagesService: ImagesService) {
    this.translate = translate;
    this.imagesService = imagesService;
  }

  public buildOptions(): any {
    const currentRef = this;
    return {
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: { stepSize: 1 },
            scaleLabel: { display: true, labelString: 'Lap' },
          },
        ],
        yAxes: [
          {
            display: true,
            position: 'left',
            ticks: { stepSize: 1, reverse: true },
            scaleLabel: { display: true, labelString: 'Position' },
          },
          {
            display: true,
            position: 'right',
            ticks: { stepSize: 1, reverse: true },
          },
        ],
      },
      legend: {
        labels: { fontColor: 'gray' },
        position: 'bottom',
      },
      elements: {
        point: { pointStyle: 'rectRot' },
      },
      layout: {
        padding: { left: 20, right: 20, top: 20, bottom: 20 },
      },
      tooltips: {
        enabled: true,
        position: 'nearest',
        mode: 'index',
        intersect: false,
        itemSort: (a, b, data) => a.y - b.y,
        callbacks: {
          title: function(tooltipItem, data) {
            return `${currentRef.translate.instant('lap.sing')}: ${
              tooltipItem[0].xLabel
            }`.toUpperCase();
          },
          label: function(tooltipItem, data) {
            const value =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] ||
              '';
            return `${data.datasets[tooltipItem.datasetIndex].label}: ${value}`;
          },
        },
      },
    };
  }

  buildData(
    qualifying_: QualifyingResult[],
    results_: Result[],
    laps_: Lap[],
    pits_: PitStop[],
    chartColors: any,
  ): any {
    const data = { labels: [], datasets: [] };

    if (!laps_ || !laps_.length || !results_ || !results_.length) {
      return data;
    }

    const mapResults = this.createMapResults(results_);
    const mapPits = this.createMapPits(pits_);

    data.labels = laps_.map(l => l.number);
    if (qualifying_ !== undefined) {
      data.labels.unshift(0);
    }

    const mapPositions: Map<string, Timing[]> = new Map();
    laps_.forEach(l => {
      l.Timings.forEach(t => {
        if (!mapPositions.has(t.driverId)) {
          mapPositions.set(t.driverId, []);
        }
        mapPositions.get(t.driverId).push(t);
      });
    });

    // add laps data
    mapPositions.forEach((values, key) =>
      data.datasets.push({
        label: `${mapResults.get(key).Driver.givenName} ${
          mapResults.get(key).Driver.familyName
        }`,
        data: this.createDataArray(key, qualifying_, values),
        fill: false,
        lineTension: 0,
        borderColor: chartColors[data.datasets.length],
        backgroundColor: chartColors[data.datasets.length],
        pointRadius: 2,
        pointHoverRadius: 5,
        pointStyle: this.buildStatusImagesArray(
          key,
          laps_.length,
          qualifying_ !== undefined,
          mapResults,
          mapPits,
        ),
      }),
    );

    return data;
  }

  private createDataArray(
    driverId: string,
    qualifying: QualifyingResult[],
    timing: Timing[],
  ): any {
    const arrayValues = timing.map(v => +v.position);

    if (qualifying !== undefined) {
      const drQualify = qualifying.find(q => q.Driver.driverId === driverId);
      if (drQualify !== undefined) {
        arrayValues.unshift(+drQualify.position);
      }
    }

    return arrayValues;
  }

  private createMapResults(results: Result[]): Map<string, Result> {
    const mapResults: Map<string, Result> = new Map();
    results.forEach(r => mapResults.set(r.Driver.driverId, r));
    return mapResults;
  }

  private createMapPits(pits: PitStop[]): Map<string, PitStop[]> {
    const mapPits: Map<string, PitStop[]> = new Map();

    if (pits) {
      pits.forEach(p => {
        if (!mapPits.has(p.driverId)) {
          mapPits.set(p.driverId, []);
        }
        mapPits.get(p.driverId).push(p);
      });
    }

    return mapPits;
  }

  private buildStatusImagesArray(
    driverId: string,
    raceLaps: number,
    qualifyingPresent: boolean,
    mapResults: Map<string, Result>,
    mapPits: Map<string, PitStop[]>,
  ): any {
    const qualifyLap = qualifyingPresent ? 1 : 0;
    const imgArray = Array(raceLaps + qualifyLap).fill('');

    // pits image
    const iconPit = new Image(16, 16);
    iconPit.src = this.imagesService.getPitStopImagePath();

    const drPits = mapPits.get(driverId);
    if (drPits != null) {
      drPits.forEach(
        p => (imgArray[+p.lap - (qualifyingPresent ? 0 : 1)] = iconPit),
      );
    }

    // result image
    const drResult: Result = mapResults.get(driverId);
    if (drResult != null) {
      const image = new Image(16, 16);
      image.src = this.imagesService.getFinishStatusImagePath(drResult.status);
      imgArray[+drResult.laps - (qualifyingPresent ? 0 : 1)] = image;
    }

    return imgArray;
  }
}
