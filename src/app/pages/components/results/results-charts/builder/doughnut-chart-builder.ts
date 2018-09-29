import { PieChartBuilder } from "./pie-chart-builder";
import { ChartBuilderType } from "./chart-builder";

export class DoughnutChartBuilder extends PieChartBuilder {

    getType(): ChartBuilderType {
        return ChartBuilderType.Doughnut;
    }
}