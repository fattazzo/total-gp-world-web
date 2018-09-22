import { ChartBuilder, Group, ResultType } from "./chart-builder";
import { NbJSThemeOptions } from "@nebular/theme/services/js-themes/theme.options";
import { Race } from "../../../../../domain/race";
import { ChartType } from "../chart-types";
import { TranslateService } from "@ngx-translate/core";
import { CapitalizePipe } from "../../../../../@theme/pipes";

export class PieChartBuilder extends ChartBuilder {

    labelTooltip = ''

    constructor(results: Race[], group: Group = Group.Driver, type: ChartType, translation: TranslateService, result: ResultType) {
        super(results, group, type, translation, result);

        this.translation$.get(this.type$.labelKey.split('.')[0] + '.sing').subscribe(res => this.labelTooltip = new CapitalizePipe().transform(res));
    }

    getType(): string {
        return "pie";
    }

    getData(config: NbJSThemeOptions) {
        let labels: number[] = this.getLabels();

        let data = {
            labels: labels,
            datasets: []
        };

        this.datasets.forEach(ds => {
            let occ = [];
            let dsLabel = '';
            ds.forEach(dd => {
                occ[dd.value] = occ[dd.value] ? occ[dd.value] + 1 : 1;
                dsLabel = dd.label;
            })

            let values: number[] = [];
            labels.forEach(l => values.push(occ[l] || 0))

            data.datasets.push({
                label: dsLabel,
                data: values,
                backgroundColor: config.variables.chartBGColors
            });
        })

        return data;
    }

    private getLabels(): number[] {
        let labelsSet: Set<number> = new Set();
        this.chartData.forEach(cd => labelsSet.add(+cd[this.type$.propName]))

        return Array.from(labelsSet).sort((a, b) => a - b)
    }

    getTooltipsCallbacks() {
        var currentRef = this;
        if (this.multipleDataset) {
            return {
                title: function (tooltipItem, data) {
                    return data.datasets[tooltipItem[0].datasetIndex].label || '';
                },
                beforeLabel: function (tooltipItem, data) {
                    return currentRef.labelTooltip + ': ' + data.labels[tooltipItem.index] || '';
                },
                label: function (tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                    return `Nr: ${value}`;
                }
            };
        } else {
            return {
                beforeLabel: function (tooltipItem, data) {
                    return currentRef.labelTooltip + ': ' + data.labels[tooltipItem.index] || '';
                },
                label: function (tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return `Nr: ${value}`;
                }
            }
        };
    }
}