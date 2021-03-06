import { BarChartBuilder } from "./bar-chart-builder";
import { ChartBuilderType } from "./chart-builder";

export class LineChartBuilder extends BarChartBuilder {

    getType(): ChartBuilderType {
        return ChartBuilderType.Line;
    }

    curtomizeBgColor(color: string) {
        return addAlpha(color, 0.5);
    }
}

function addAlpha(color: string, opacity: number): string {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}