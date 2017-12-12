// SparklineChart
// an NVd3 based chart that looks like a sparkline
// http://krispo.github.io/angular-nvd3/#/sparklinePlus

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

    import {
        INvd3SingleSeriesData,
        ISparklinePlus
    } from "./nvd3-interfaces";

    import {
        IMetric,
        ValueType
    } from "../../crossfilter-manager/key-metric-manager";

    // chart def interface (contains data on how to build the chartViewModel)
    export interface ISparklineChart<T> extends IAbstractNvd3ChartBase<T> {
        isPlus?: boolean;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface ISparklineChartViewModel<T> extends IAbstractNvd3ChartViewModelBase<T> {
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific nvd3 options)
    export class SparklineChartViewModel<T> extends AbstractNvd3ChartViewModelBase<T> implements ISparklineChartViewModel<T> {
        constructor(chartBase: ISparklineChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = chartBase.isPlus ? "sparklinePlus" : "sparkline";

            this.dataMapFunc = () => {
                var ret = <INvd3SingleSeriesData[]>[];
                if (this.chartBase.crossfilterGrouping.metricIds.length > 1) {
                    console.log(Error("sparklineChart can only have one metric. using last one passed."), this.chartBase.crossfilterGrouping.metricIds);
                }
                if (this.chartBase.crossfilterGrouping.key.valueType === ValueType.String) {
                    console.log(Error("sparklineChart cannot be used with keys of type string."), this.chartBase.crossfilterGrouping.key);
                }
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: IMetric<T>) => {
                    // for each metric, grab the values from the group
                    ret = this.chartBase.crossfilterGrouping.group.top(Infinity).reverse().map((d: any) => {
                        return {
                            key: d.key,
                            label: d.key, // save key in label, because nvd3 trumps key
                            value: metric.valueFunc(d)
                        };
                    });

                });
                return ret;
            };

            super.init($.proxy((c: any) => {
                // make other chart specific alterations after init
                var chart: ISparklinePlus = c.chart;
                var metric: IMetric<T> = this.chartBase.crossfilterGrouping.metrics[0];

                // chart.alignValue = true;
                chart.xTickFormat = this.chartBase.crossfilterGrouping.key.shortFormatFunc;
                chart.yTickFormat = this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc;

            }, this));

            // make other chart specific alterations after init
        }
    }
// }