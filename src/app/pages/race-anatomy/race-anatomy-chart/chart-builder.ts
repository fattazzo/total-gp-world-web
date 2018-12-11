import { Lap, Timing } from '../../../domain/lap';
import { PitStop } from '../../../domain/pitstop';
import { TranslateService } from '@ngx-translate/core';
export class ChartBuilder {
  private translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
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

  buildData(laps_: Lap[], pits_: PitStop[], chartColors: any): any {
    const data = { labels: [], datasets: [] };

    if (!pits_ || !laps_) {
      return data;
    }

    data.labels = laps_.map(l => l.number);

    const mapPositions: Map<string, Timing[]> = new Map();
    laps_.forEach(l => {
      l.Timings.forEach(t => {
        if (!mapPositions.has(t.driverId)) {
          mapPositions.set(t.driverId, []);
        }
        mapPositions.get(t.driverId).push(t);
      });
    });

    const icon = new Image();
    icon.src =
      'https://www.gravatar.com/avatar/e4bf3afb207c43fe0d21641ba1bf6920?s=32&d=identicon&r=PG';

    mapPositions.forEach((values, key) =>
      data.datasets.push({
        label: key,
        data: values.map(v => +v.position),
        time: values.map(v => v.time),
        fill: false,
        lineTension: 0,
        borderColor: chartColors[data.datasets.length],
        backgroundColor: chartColors[data.datasets.length],
        pointRadius: 2,
        pointHoverRadius: 5,
        pointStyle: values.map(v => ''),
      }),
    );

    return data;
  }
}
