// LineChart
// an NVd3 based chart with lines aligned across the xaxis
// http://krispo.github.io/angular-nvd3/#/lineChart

// module InteractiveCharts.ChartManager.Nvd3Chart {
    "use strict";

    import {
        AbstractNvd3CoordinateGridChartViewModel,
        IAbstractNvd3CoordinateGridChart,
        IAbstractNvd3CoordinateGridChartViewModel
    } from "./abstract-nvd3-coordinate-grid-chart-view-model";
    import {
        IChartManager
    } from "../chart-manager";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";

    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces
    import * as Util from "../../shared/util";
    import {
        IAxis,
        ILinePlusBarChart,
        INvd3MultiSeriesData
    } from "./nvd3-interfaces";

    export interface ILinePlusBarChartSeries {
        isBar: boolean;
        yAxisIndex: number;
        metricDefinesAxis?: boolean;
        color?: string;
    }

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IExtendedLinePlusBarChart<T> extends ILinePlusBarChart, IAbstractNvd3CoordinateGridChart<T> {
        linePlusBarChartSeries?: (d: IMetric<T>) => ILinePlusBarChartSeries;
        legendLeftAxisHint?: string;
        focusShowAxisY?: boolean;
        focusEnable?: boolean;
        focusHeight?: number;
        interpolate?: string; // monotone, linear, etc...
        rightYAxisLabel?: string;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface ILinePlusBarChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific nvd3 options)
    export class LinePlusBarChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements ILinePlusBarChartViewModel<T> {
        constructor(chartBase: IExtendedLinePlusBarChart<T>, chartManager: IChartManager<T>) {
            super(<IAbstractNvd3CoordinateGridChart<T>>chartBase, chartManager);

            this.chartType = "linePlusBarChart";
            this.type = this.chartType;

            this.mapPointData = (point: Util.ILabelKeyValueTuple) => {
                return {
                    label: point.label, // save key in label, because nvd3 trumps key
                    key: point.key,
                    value: (point.value === null ? 0 : point.value)
                };
            };

            // adding in multi axis data to series
            this.mapSeriesData = (series: INvd3MultiSeriesData, metric: IMetric<T>, seriesId: number) => {
                var linePlusBarChartSeriesData = chartBase.linePlusBarChartSeries(metric);

                return {
                    key: series.key,
                    values: series.values.map((d) => {
                        d.displayLabel = this.chartBase.crossfilterGrouping.key.longFormatFunc(d.label); // save label of x bucket
                        d.displayValue = metric.shortFormatFunc(d.value);
                        d.key = series.key; // save series name
                        return d;
                    }),
                    bar: linePlusBarChartSeriesData.isBar,
                    color: (typeof (linePlusBarChartSeriesData.color) !== "undefined") ? linePlusBarChartSeriesData.color :
                        this.colors[((typeof this.colorAccessor !== "undefined") ? this.colorAccessor(null, seriesId) : seriesId) % this.colors.length]
                };
            };

            super.init($.proxy((c: any) => {
                // make other chart specific alterations after init
                var chart: IExtendedLinePlusBarChart<T> = c.chart;

                // define axis based on metrics
                var axisIndexs: Array<number> = [];
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: IMetric<T>, i: number) => {
                    var multiChartSeriesData = chartBase.linePlusBarChartSeries(metric);
                    if (multiChartSeriesData.metricDefinesAxis) {
                        axisIndexs[multiChartSeriesData.yAxisIndex] = i;
                    }
                });

                chart.x2Axis = <IAxis>{};
                chart.xAxis.tickFormat = (chartBase.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.key.shortFormatFunc(d); } :
                    this.chartBase.crossfilterGrouping.key.shortFormatFunc;
                chart.x2Axis.tickFormat = (chartBase.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.key.shortFormatFunc(d); } :
                    this.chartBase.crossfilterGrouping.key.shortFormatFunc;
                chart.xAxis.showMaxMin = !this.hideMaxMinX;
                chart.x2Axis.showMaxMin = !this.hideMaxMinX;

                if (Util.isDefinedAndNotNull(axisIndexs[1])) {
                    chart.y1Axis = <IAxis>{
                        axisLabel: chartBase.hideYAxisLabel ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].title,
                        tickFormat: this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                    chart.y3Axis = <IAxis>{
                        tickFormat: this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                }
                if (Util.isDefinedAndNotNull(axisIndexs[2])) {
                    chart.y2Axis = <IAxis>{
                        axisLabel: chartBase.hideYAxisLabel ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].title,
                        tickFormat: this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                    chart.y4Axis = <IAxis>{
                        tickFormat: this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                }

                // if yAxisLabel is specified, it overwrites metric title or hideYAxisLabel
                if (chartBase.yAxisLabel && chartBase.yAxisLabel.length) {
                    chart.y1Axis.axisLabel = chartBase.yAxisLabel;
                }
                if (chartBase.rightYAxisLabel && chartBase.rightYAxisLabel.length) {
                    chart.y2Axis.axisLabel = chartBase.rightYAxisLabel;
                }

                // need to override tooltips because of nvd3 error
                chart.tooltip.contentGenerator = (d: any, lineCharMax?: number) => { return Util.multiSeriesContentGenerator(d, chartBase.maxTooltipKeyLen); };

                if ("undefined" !== typeof chartBase.legendLeftAxisHint) {
                    chart.legendLeftAxisHint = chartBase.legendLeftAxisHint;
                }
                if ("undefined" !== typeof chartBase.focusEnable) {
                    chart.focusEnable = chartBase.focusEnable;
                }
                if ("undefined" !== typeof chartBase.focusShowAxisY) {
                    chart.focusShowAxisY = chartBase.focusShowAxisY;
                }
                if ("undefined" !== typeof chartBase.focusHeight) {
                    chart.focusHeight = chartBase.focusHeight;
                }
                if ("undefined" !== typeof chartBase.interpolate) {
                    chart.interpolate = chartBase.interpolate;
                }
            }, this));

            // make other chart specific alterations after init
        }
    }
// }