import { ChartBuilderType } from "./builder/chart-builder";

export enum ChartValue { Points, Grid, Positions }

export class ChartTypes {

    static POINTS: ChartType = {
        value: ChartValue.Points,
        labelKey: 'point.plur',
        propName: 'points',
        type: ChartBuilderType.Line,
        altType: ChartBuilderType.Bar
    };

    static GRID: ChartType = {
        value: ChartValue.Grid,
        labelKey: 'grid.sing',
        propName: 'grid',
        type: ChartBuilderType.Doughnut,
        altType: ChartBuilderType.Pie
    };

    static POSITIONS: ChartType = {
        value: ChartValue.Positions,
        labelKey: 'position.plur',
        propName: 'position',
        type: ChartBuilderType.Doughnut,
        altType: ChartBuilderType.Pie
    };
}

export class ChartType {

    value: ChartValue;
    labelKey: string;
    propName: string;

    type: ChartBuilderType;
    altType: ChartBuilderType;
}