// MultiBarChart
// an NVd3 based chart with multiple bars aligned across the xaxis
// http://krispo.github.io/angular-nvd3/#/multiBarChart

// module InteractiveCharts.ChartManager.Nvd3Chart {
    "use strict";
    import "./interactive-nvd3-chart.tpl.html";
    import "./nvd3-chart.less";

    import {
        AbstractNvd3CoordinateGridChartViewModel,
        IAbstractNvd3CoordinateGridChart,
        IAbstractNvd3CoordinateGridChartViewModel
    } from "./abstract-nvd3-coordinate-grid-chart-view-model";
    import {
        IChartManager
    } from "../chart-manager";
    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces
    import {
        IMultiBarHorizontalChart
    } from "./nvd3-interfaces";

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IMultiBarChart<T> extends IAbstractNvd3CoordinateGridChart<T> {
        hideControls?: boolean;
        stacked?: boolean;
        isHorizontal?: boolean;
        showValues?: boolean;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface IMultiBarChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
        // add any additional options as we support them
    }

    // view model class (use init to add most chart specific nvd3 options)
    export class MultiBarChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements IMultiBarChartViewModel<T> {
        constructor(chartBase: IMultiBarChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = chartBase.isHorizontal ? "multiBarHorizontalChart" : "multiBarChart";

            super.init($.proxy((c: any) => {
                // make other chart specific alterations after init
                var chart: IMultiBarHorizontalChart = c.chart;
                if (chartBase.hideControls) {
                    chart.showControls = !chartBase.hideControls;
                }
                if (chartBase.stacked) {
                    chart.stacked = chartBase.stacked;
                }
                if (chartBase.showValues) {
                    chart.showValues = chartBase.showValues;
                    chart.valueFormat = this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc;
                }
            }, this));

            // make other chart specific alterations after init
        }
    }
// }