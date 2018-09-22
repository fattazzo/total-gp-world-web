export enum ChartValue { Points, Grid, Positions }

export class ChartTypes {

    static POINTS: ChartType = { value: ChartValue.Points, labelKey: 'point.plur', propName: 'points' };
    static GRID: ChartType = { value: ChartValue.Grid, labelKey: 'grid.sing', propName: 'grid' };
    static POSITIONS: ChartType = { value: ChartValue.Positions, labelKey: 'position.plur', propName: 'position' };
}

export class ChartType {

    value: ChartValue;
    labelKey: string;
    propName: string
}