import { PieChartBuilder } from "./pie-chart-builder";

export class DoughnutChartBuilder extends PieChartBuilder {

    getType(): string {
        return "doughnut";
    }
}