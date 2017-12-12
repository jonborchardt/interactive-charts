// MultiChart
// an NVd3 based chart that shows multiple series and multiple axis
// http://krispo.github.io/angular-nvd3/#/multiChart

// module InteractiveCharts.ChartManager.Nvd3Chart {
    "use strict";

    import * as d3 from "d3";

    import {
        AbstractNvd3CoordinateGridChartViewModel,
        IAbstractNvd3CoordinateGridChart,
        IAbstractNvd3CoordinateGridChartViewModel
    } from "./abstract-nvd3-coordinate-grid-chart-view-model";
    import {
        IExtendedNvd3Data
    } from "./nvd3-interfaces";
    import {
        IChartManager
    } from "../chart-manager";
    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";
    import {
        IMultiBarHorizontalChart
    } from "./nvd3-interfaces";
    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces
    import * as nvd3 from "./nvd3-interfaces"; // todo: remove once we have the real nvd3 interfaces
    import * as Util from "../../shared/util";
    import * as KeyMetricManager from "../../crossfilter-manager/key-metric-manager"; // todo: seems wrong

    export enum MultiChartType {
        bar,
        line,
        area
    }

    export interface IMultiChartSeries {
        chartType: MultiChartType;
        yAxisIndex: number;
        metricDefinesAxis?: boolean;
        color?: string;
    }


    // chart def interface (contains data on how to build the chartViewModel)
    export interface IMultiChart<T> extends IAbstractNvd3CoordinateGridChart<T> {
        multiChartSeries?: (d: IMetric<T>) => IMultiChartSeries;
        treatDatesAsCatagories?: boolean;
        isArea?: boolean;
        rightYAxisLabel?: string;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface IMultiChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific nvd3 options)
    export class MultiChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements IMultiChartViewModel<T> {
        private xLabels: Array<string> = []; // list of labels to use on x axis in categorical view

        constructor(chartBase: IMultiChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = "multiChart";

            // todo: adding y for nvd3 error that will be fixed eventually https://github.com/novus/nvd3/issues/1123
            this.mapPointData = (point: any) => {
                return {
                    label: point.key, // save key in label, because nvd3 trumps key
                    key: point.key,
                    index: point.index,
                    value: point.value,
                    // x-value defaults to point.label: need to provide a numerical value
                    x: typeof point.label === "string" ? point.index : point.label,
                    y: (point.value === null ? 0 : point.value)
                };
            };
            // adding in multi axis data to series
            this.mapSeriesData = (series: IExtendedNvd3Data, metric: IMetric<T>, seriesId: number) => {
                var multiChartSeriesData = chartBase.multiChartSeries(metric);
                var vals = series.values;

                // keep track of previous values for the categorical case
                var tickIndex: number = 0;
                var lastTickString: string = null;

                vals = series.values.map((d: any, index: number) => {
                    d.displayLabel = this.chartBase.crossfilterGrouping.key.longFormatFunc(d.label); // save label of x bucket
                    d.displayValue = metric.longFormatFunc(d.value);
                    d.key = series.key; // save series name

                    // if we are a categorical key, we need to set up the xaxis correctly due to a 'bug' in nvd3
                    if (this.chartBase.crossfilterGrouping.key.valueType === KeyMetricManager.ValueType.String || ((<IMultiChart<T>>this.chartBase).treatDatesAsCatagories &&
                        this.chartBase.crossfilterGrouping.key.valueType === KeyMetricManager.ValueType.DateTime)) {
                        var newX = 0;
                        if (lastTickString !== d.label) {
                            lastTickString = d.label;
                            newX = tickIndex++;
                        }
                        // save the domain list for use on axis
                        if ("undefined" === typeof this.xLabels[newX]) {
                            this.xLabels[newX] = this.chartBase.crossfilterGrouping.key.shortFormatFunc(d.label);
                        }
                        d.label = newX; // label must be the number (to amke line charts work)
                    }
                    d.index = index;
                    return d;
                });
                return {
                    key: series.key,
                    values: vals,
                    yAxis: multiChartSeriesData.yAxisIndex,
                    type: MultiChartType[multiChartSeriesData.chartType],
                    color: (typeof (multiChartSeriesData.color) !== "undefined") ? multiChartSeriesData.color :
                        this.colors[((typeof this.colorAccessor !== "undefined") ? this.colorAccessor(null, seriesId) : seriesId) % this.colors.length]
                };
            };

            super.init((c: any) => {
                // make other chart specific alterations after init
                var chart: nvd3.IMultiChart = c.chart;

                // define axis based on metrics
                var axisIndexs: Array<number> = [];
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: IMetric<T>, i: number) => {
                    var multiChartSeriesData = chartBase.multiChartSeries(metric);
                    if (multiChartSeriesData.metricDefinesAxis) {
                        axisIndexs[multiChartSeriesData.yAxisIndex] = i;
                    }
                });
                // if we are a categorical key, we need to set up the xaxis correctly due to a 'bug' in nvd3
                if (this.chartBase.crossfilterGrouping.key.valueType === KeyMetricManager.ValueType.String || ((<IMultiChart<T>>this.chartBase).treatDatesAsCatagories &&
                    this.chartBase.crossfilterGrouping.key.valueType === KeyMetricManager.ValueType.DateTime)) {
                    // remove any blank values from xLabels
                    this.xLabels = this.xLabels.filter((label: any) => {
                        return typeof label !== "undefined";
                    });

                    var width: number = this.chartBase.sizeData.width - this.chartBase.sizeData.margin.left - this.chartBase.sizeData.margin.right;
                    var first: number = (width / this.xLabels.length) / 2;
                    var last: number = width - first;

                    // clip labels if there is no room
					/*var averageCharWidth = 5.139;
					var ellepsisLen = 14.016;
					var charsToShow = (width / this.xLabels.length) / averageCharWidth;
					var charsWithEllipse = ((width / this.xLabels.length) - ellepsisLen) / averageCharWidth;
					for (var i = 0; i < this.xLabels.length; i++) {
						if (this.xLabels[i].length > charsToShow) {
							this.xLabels[i] = trim(this.xLabels[i], charsWithEllipse);
						}
					};*/

                    chart.xAxis = <nvd3.IAxis>{
                        scale: d3.scale.ordinal()
                            .domain(this.xLabels)
                            .rangePoints([first, last]),
                        axisLabel: this.hideXAxisLabel ? "" : this.chartBase.crossfilterGrouping.key.title,
                        showMaxMin: !chartBase.hideMaxMinX
                    };
                }

                // pull start of lines to middle of bars
                this.createSubCharts(chart);
                chart.lines1.padData = true;
                chart.lines2.padData = true;
                chart.stack1.padData = true;
                chart.stack2.padData = true;
                chart.lines1.isArea = chartBase.isArea;
                chart.lines2.isArea = chartBase.isArea;

                // need to override tooltips because of nvd3 error
                chart.tooltip.contentGenerator = (d: any, lineCharMax?: number) => { return Util.multiSeriesContentGenerator(d, chartBase.maxTooltipKeyLen); };
                chart.xAxis.rotateLabels = chartBase.rotateLabels || 0;
                chart.yDomain1 = this.yDomain1;
                chart.yDomain2 = this.yDomain2;

                if (Util.isDefinedAndNotNull(axisIndexs[1])) {
                    chart.yAxis1 = <nvd3.IAxis>{
                        axisLabel: chartBase.hideYAxisLabel ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].title,
                        tickFormat: (this.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].shortFormatFunc(d); }
                            : this.chartBase.crossfilterGrouping.metrics[axisIndexs[1]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                }

                if (Util.isDefinedAndNotNull(axisIndexs[2])) {
                    chart.yAxis2 = <nvd3.IAxis>{
                        axisLabel: chartBase.hideYAxisLabel ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].title,
                        tickFormat: (this.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].shortFormatFunc(d); }
                            : this.chartBase.crossfilterGrouping.metrics[axisIndexs[2]].shortFormatFunc,
                        showMaxMin: !chartBase.hideMaxMinY
                    };
                }

                // if yAxisLabel is specified, it overwrites metric title or hideYAxisLabel
                if (chartBase.yAxisLabel && chartBase.yAxisLabel.length) {
                    chart.yAxis1.axisLabel = chartBase.yAxisLabel;
                }

                if (Util.isDefinedAndNotNull(axisIndexs[2]) && Util.isDefinedAndNotNull(chartBase.rightYAxisLabel) && chartBase.rightYAxisLabel.length) {
                    chart.yAxis2.axisLabel = chartBase.rightYAxisLabel;
                }

                this.createSubCharts(chart);
        });

            // make other chart specific alterations after init
        }

        public onRender: () => void = (): void => {
            // temporary fix for nvtooltip persistence issue
            var tooltips: any = d3.selectAll(".nvtooltip");
            d3.selectAll(".chart_" + this.id).on("mouseleave", () => {
                tooltips.style("opacity", 0);
            });

            // fix spacing between axis and the labels
            var leftAxisLabel: any = d3.selectAll(".nvd3 .nv-y1 text.nv-axislabel");
            leftAxisLabel.attr("dy", "0.8em");

            var rightAxisLabel: any = d3.selectAll(".nvd3 .nv-y2 text.nv-axislabel");
            rightAxisLabel.attr("dy", "1.4em");
        };

        // create all sub charts if they dont exist yet
        private createSubCharts(chart: any) {
            if ("undefined" === typeof chart.lines1) {
                chart.lines1 = <nvd3.ILineChart>{};
            }
            if ("undefined" === typeof chart.lines2) {
                chart.lines2 = <nvd3.ILineChart>{};
            }
            if ("undefined" === typeof chart.stack1) {
                chart.stack1 = <nvd3.IStackedAreaChart>{};
            }
            if ("undefined" === typeof chart.stack2) {
                chart.stack2 = <nvd3.IStackedAreaChart>{};
            }
            if ("undefined" === typeof chart.bars1) {
                chart.bars1 = <nvd3.IMultiBarChart>{};
            }
            if ("undefined" === typeof chart.bars2) {
                chart.bars2 = <nvd3.IMultiBarChart>{};
            }
        }
    }
// }
