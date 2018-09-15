import { NbJSThemeVariable } from "@nebular/theme/services/js-themes/theme.options";

export class ChartBuilder {

    public static buildPieChartOptions(serieName: string, tooltipFormatter: string = '{b}<br>{c} ({d}%)', serieData: any[], legendData: any[]): any {
        return {
            backgroundColor: echarts.bg,
            //color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
            tooltip: {
                trigger: 'item',
                formatter: tooltipFormatter,
                confine: true,
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: 'bottom',
                confine: true,
                data: legendData,
                textStyle: {
                    color: echarts.textColor,
                },
            },
            series: [
                {
                    name: serieName,
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    data: serieData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: echarts.itemHoverShadowColor,
                        },
                    },
                    label: {
                        position: 'inside',
                        color: echarts.textColor,

                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                    },
                },
            ],
        }
    }

    public static buildBarChartOptions(eTheme: any, serieName: string, serieData: any[], xdata: any[]): any {
        return {
            grid: { x: "0%", y: "0%", width: "100%", height: "100%" },
            tooltip: {
                trigger: 'axis',
                confine: true,
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: eTheme.tooltipLineColor,
                        width: eTheme.tooltipLineWidth,
                    },
                },
                textStyle: {
                    color: eTheme.tooltipTextColor,
                    fontSize: 20,
                    fontWeight: eTheme.tooltipFontWeight,
                },
                position: 'top',
                backgroundColor: eTheme.tooltipBg,
                borderColor: eTheme.tooltipBorderColor,
                borderWidth: 3,
                formatter: '{b}<br>' + serieName + ' {c0}',
                extraCssText: eTheme.tooltipExtraCss,
            },
            xAxis: {
                data: xdata, //this.results$.map(race => race.raceName),
                axisLabel: {
                    color: eTheme.xAxisTextColor,
                    fontSize: 18,
                    show: false,
                },
            },
            yAxis: {
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                }
            },
            series: [
                {
                    type: 'bar',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            width: eTheme.lineWidth,
                            type: eTheme.lineStyle,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: eTheme.lineGradFrom,
                            }, {
                                offset: 1,
                                color: eTheme.lineGradTo,
                            }]),
                            shadowColor: eTheme.shadowLineDarkBg,
                            shadowBlur: 14,
                            opacity: 1,
                        },
                    },
                    data: serieData,
                },
            ],

        }
    }
}