// PieChart
// an NVd3 based chart that looks like a pie
// http://krispo.github.io/angular-nvd3/#/pieChart

// module InteractiveCharts.ChartManager.Nvd3Chart {
    "use strict";

    import {
        AbstractNvd3ChartViewModelBase,
        IAbstractNvd3ChartBase,
        IAbstractNvd3ChartViewModelBase
    } from "./abstract-nvd3-chart-view-model-base";
    import {
        IChartManager
    } from "../chart-manager";
    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces
    import * as nvd3 from "./nvd3-interfaces"; // todo: remove once we have the real nvd3 interfaces

// import Util = InteractiveCharts.Shared.Util;
    import * as Util from "../../shared/util";

    import * as KeyMetricManager from "../../crossfilter-manager/key-metric-manager";
    // chart def interface (contains data on how to build the chartViewModel)
    export interface IPieChart<T> extends IAbstractNvd3ChartBase<T> {
        hideLabels?: boolean;
        donut?: boolean;
        innerRadius?: number;
        showPercents?: boolean;
        maxPartsCount?: number;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface IPieChartViewModel<T> extends IAbstractNvd3ChartViewModelBase<T> {
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific nvd3 options)
    export class PieChartViewModel<T> extends AbstractNvd3ChartViewModelBase<T> implements IPieChartViewModel<T> {
        constructor(chartBase: IPieChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = "pieChart";
            this.dataMapFunc = () => {
                var ret = <nvd3.INvd3SingleSeriesData[]>[];
                if (this.chartBase.crossfilterGrouping.metricIds.length > 1) {
                    console.log(Error("pieChart can only have one metric. using last one passed."), this.chartBase.crossfilterGrouping.metricIds);
                }
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: KeyMetricManager.IMetric<T>) => {
                    // for each metric, grab the values from the group
                    var total = 0;
                    if (chartBase.showPercents) {
                        this.chartBase.crossfilterGrouping.group.top(Infinity).forEach((d) => {
                            total += metric.valueFunc(<Util.ILabelKeyValueTuple>d);
                        });
                    }
                    ret = this.chartBase.crossfilterGrouping.group.top(Infinity).map((d: any) => {
                        var val = metric.valueFunc(<Util.ILabelKeyValueTuple>d);
                        var percent = total > 0 ? (val * 100 / total) : undefined;
                        var percentStr = total > 0 ? " - " + Util.commaShiftingFormatter(percent, Util.commaFormatter[1]) + "%" : "";
                        var lab: string = this.chartBase.crossfilterGrouping.key.shortFormatFunc(d.key) + percentStr;
                        return {
                            label: lab, // save key in label, because nvd3 trumps key
                            key: lab,
                            value: val,
                            percent: percent
                        };
                    });
                });
                if (this.orderFunc && this.orderFunc.func) {
                    ret = this.orderFunc.func(ret);
                    // if maxPartsCount is specified, aggregate parts except the first N parts
                    if (chartBase.maxPartsCount && chartBase.maxPartsCount < ret.length) {
                        var retCopy = ret.slice(0, chartBase.maxPartsCount);
                        var otherVal = ret.slice(chartBase.maxPartsCount).reduce((previousValue: Util.ILabelKeyValueTuple, currentValue: Util.ILabelKeyValueTuple) => {
                            var percentStr = (chartBase.showPercents) ?
                                " - " + Util.commaShiftingFormatter((previousValue.percent + currentValue.percent), Util.commaFormatter[1]) + "%"
                                : "";
                            return {
                                label: "Other" + percentStr,
                                key: "Other" + percentStr, value: previousValue.value + currentValue.value,
                                percent: previousValue.percent + currentValue.percent
                            };
                        });
                        retCopy[chartBase.maxPartsCount.toString()] = otherVal;
                        ret = retCopy;
                    }
                }
                return ret;
            };

            super.init($.proxy((c: any) => {
                // make other chart specific alterations after init
                var chart: nvd3.IPieChart = c.chart;
                // set defaults // TODO: should we push any of these as options to caller?
                if (chartBase.donut) {
                    chart.donutRatio = chartBase.innerRadius ? ((chartBase.innerRadius * 2) /
                        Math.min(chartBase.sizeData.width - chartBase.sizeData.margin.left - chartBase.sizeData.margin.right,
                            chartBase.sizeData.height - chartBase.sizeData.margin.top - chartBase.sizeData.margin.bottom))
                        : 0.35;
                    chart.donut = true;
                    chart.labelsOutside = true;
                    chart.cornerRadius = 3; // todo, make optional
                }
                if (chartBase.hideLabels) {
                    chart.showLabels = !chartBase.hideLabels;
                }
                chart.labelThreshold = 0.05;

                // pie chart only shows 1 metric
                if (this.chartBase.crossfilterGrouping.metrics.length > 1) {
                    console.log(Error("Expecting 1 metric, found: " + this.chartBase.crossfilterGrouping.metrics.length));
                }
                chart.valueFormat = this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc;
            }, this));

            // make other chart specific alterations after init
        }
    }
// }