import { ChartBuilder, Group, ResultType } from "./chart-builder";
import { NbJSThemeOptions } from "@nebular/theme/services/js-themes/theme.options";
import { ChartType } from "../chart-types";
import { TranslateService } from "@ngx-translate/core";
import { Race } from "../../../../../domain/race";
import { CapitalizePipe } from "../../../../../@theme/pipes";

export class BarChartBuilder extends ChartBuilder {

    labelTooltip = ''

    constructor(results: Race[], group: Group = Group.Driver, type: ChartType, translation: TranslateService, result: ResultType) {
        super(results, group, type, translation, result);

        this.translation$.get(this.type$.labelKey).subscribe(res => this.labelTooltip = new CapitalizePipe().transform(res));
    }

    getData(config: NbJSThemeOptions) {
        let labels: Set<string> = new Set();
        if (this.datasets != undefined && this.datasets.size > 0) {
            this.chartData.map(cd => labels.add(cd.raceName));
        }

        let data = {
            labels: Array.from(labels),
            datasets: []
        };

        let datasetNr = 0;
        this.datasets.forEach(ds => {
            let values: number[] = [];
            let dsLabel = '';
            let color: string;
            ds.forEach(dd => {
                values.push(dd.value);
                dsLabel = dd.label;
                color = config.variables.chartBGColors[datasetNr]
            })

            data.datasets.push({
                label: dsLabel,
                data: values,
                backgroundColor: this.curtomizeBgColor(color),
                fill: true,
                borderColor: color
            });

            datasetNr++;
        })

        return data;
    }

    getType(): string {
        return 'bar';
    }

    protected curtomizeBgColor(color: string) {
        return color;
    }

    getTooltipsCallbacks() {
        var currentRef = this;
        if (this.multipleDataset) {
            return {
                title: function (tooltipItem, data) {
                    return tooltipItem[0].xLabel;
                },
                beforeLabel: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label || '';
                },
                label: function (tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                    return `${currentRef.labelTooltip}: ${value}`;
                }
            };
        } else {
            return {
                title: function (tooltipItem, data) {
                    return tooltipItem[0].xLabel;
                },
                label: function (tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                    return `${currentRef.labelTooltip}: ${value}`;
                }
            };
        }
    }
}