import { Race } from "../../../../../domain/race";
import { NbJSThemeOptions } from "@nebular/theme/services/js-themes/theme.options";
import { ChartData } from "./chart-data";
import { DatasetData } from "./dataset-data";
import { ChartType } from "../chart-types";
import { TranslateService } from "@ngx-translate/core";

export enum Group { Driver, Constructor }
export enum ResultType { Resul, Qualify }

export abstract class ChartBuilder {

    private results$: Race[];
    private group$: Group;
    private resultType$: ResultType;

    protected type$: ChartType;

    protected chartData: ChartData[];
    protected datasets: Map<string, DatasetData[]> = new Map();

    protected multipleDataset: Boolean = false;

    protected translation$: TranslateService;

    constructor(results: Race[], group: Group = Group.Driver, type: ChartType, translation: TranslateService, result: ResultType) {
        this.results$ = results;
        this.group$ = group;
        this.resultType$ = result;
        this.type$ = type;
        this.translation$ = translation;

        this.elaborateData();
    }

    private elaborateData() {
        this.chartData = [];

        let driversSet = new Set();
        let constructorsSet = new Set();

        if (this.results$ != undefined) {
            switch (this.resultType$) {
                case ResultType.Resul: {
                    this.results$.forEach(race => {
                        race.Results.forEach(result => {
                            this.chartData.push(new ChartData(race, result))
                            driversSet.add(result.Driver.driverId);
                            constructorsSet.add(result.Constructor.constructorId);
                        });
                    });
                    break;
                }
                case ResultType.Qualify: {
                    this.results$.forEach(race => {
                        race.QualifyingResults.forEach(result => {
                            this.chartData.push(new ChartData(race, result))
                            driversSet.add(result.Driver.driverId);
                            constructorsSet.add(result.Constructor.constructorId);
                        });
                    });
                    break;
                }
            }
        }

        if (this.group$ == Group.Driver) {
            this.multipleDataset = driversSet.size > 1
        } else {
            this.multipleDataset = constructorsSet.size > 1
        }

        /**
        this.chartData.sort((a, b) => {
            const raceCompare = a.raceName.localeCompare(b.raceName);
            const driverCompare = a.driverName.localeCompare(b.driverName);
            const constructorCompare = a.constructorName.localeCompare(b.constructorName);

            if (this.group$ == Group.Driver) {
                return raceCompare || driverCompare || constructorCompare;
            } else {
                return raceCompare || constructorCompare || driverCompare;
            }
        });
         */

        this.buildDatasetsData();
    }

    private buildDatasetsData() {
        let datasetData: DatasetData[] = [];

        this.chartData.forEach(cd => {
            if (this.group$ == Group.Driver) {
                datasetData.push({ label: cd.driverName, value: +cd[this.type$.propName] })
            } else {
                datasetData.push({ label: cd.constructorName, value: +cd[this.type$.propName] })
            }
        });

        this.datasets = new Map();
        datasetData.forEach(dd => {
            if (this.datasets.get(dd.label) === undefined) {
                this.datasets.set(dd.label, []);
            }
            this.datasets.get(dd.label).push(dd);
        })
    }

    getOptions(config: NbJSThemeOptions): any {
        const chartjs: any = config.variables.chartjs;

        return {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{ display: false, },],
                yAxes: [{ display: false, },],
            },
            legend: {
                labels: { fontColor: chartjs.textColor },
                position: 'bottom',
            },
            layout: {
                padding: { left: 20, right: 20, top: 20, bottom: 20 }
            },
            tooltips: { callbacks: this.getTooltipsCallbacks() }
        };
    }

    abstract getData(config: NbJSThemeOptions): any

    abstract getType(): string

    abstract getTooltipsCallbacks(): any
}