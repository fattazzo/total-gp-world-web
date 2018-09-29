import { ResultType, ChartBuilder, Group, ChartBuilderType } from "./chart-builder";
import { Race } from "../../../../../domain/race";
import { ChartType } from "../chart-types";
import { TranslateService } from "@ngx-translate/core";
import { LineChartBuilder } from "./line-chart-builder";
import { BarChartBuilder } from "./bar-chart-builder";
import { PieChartBuilder } from "./pie-chart-builder";
import { DoughnutChartBuilder } from "./doughnut-chart-builder";

export class ChartFactory {

    static getBuilder(builderType: ChartBuilderType, results: Race[], group: Group = Group.Driver, type: ChartType, translation: TranslateService, result: ResultType): ChartBuilder {
        switch (builderType) {
            case ChartBuilderType.Line: {
                return new LineChartBuilder(results, group, type, translation, result);
            }
            case ChartBuilderType.Bar: {
                return new BarChartBuilder(results, group, type, translation, result);
            }
            case ChartBuilderType.Pie: {
                return new PieChartBuilder(results, group, type, translation, result);
            }
            case ChartBuilderType.Doughnut: {
                return new DoughnutChartBuilder(results, group, type, translation, result);
            }
        }
        return null;
    }
}