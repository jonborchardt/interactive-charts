// an NVd3 based chart with lines aligned across the xaxis
// http://krispo.github.io/angular-nvd3/#/lineChart

// module InteractiveCharts.ChartManager.Nvd3Chart {
    "use strict";

    import * as nvd3 from "./nvd3-interfaces";

    import * as Util from "../../shared/util";
    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces

    import {
        AbstractNvd3CoordinateGridChartViewModel,
        IAbstractNvd3CoordinateGridChart,
        IAbstractNvd3CoordinateGridChartViewModel
    } from "./abstract-nvd3-coordinate-grid-chart-view-model";
    import {
        IChartManager
    } from "../chart-manager";

    import {
        IAxis
    } from "./nvd3-interfaces";


    // chart def interface (contains data on how to build the chartViewModel)
    export interface ILineChart<T> extends IAbstractNvd3CoordinateGridChart<T> {
        isArea?: (d: any) => boolean;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface ILineChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
        // add any additional options as we support them
    }

    // view model class (use init to add most chart specific nvd3 options)
    export class LineChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements ILineChartViewModel<T> {
        constructor(chartBase: ILineChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = "lineChart";

            super.init($.proxy((c: any) => {
                // make other chart specific alterations after init
                var chart: ILineChart<T> = c.chart;
                if (chartBase.isArea) {
                    chart.isArea = chartBase.isArea;
                }
                // chart.tooltip.contentGenerator = (d: any, lineCharMax?: number) => { return Util.multiSeriesContentGenerator(d, chartBase.maxTooltipKeyLen); };

                let yAxisLabel: string = "";
                if (chartBase.yAxisLabel && chartBase.yAxisLabel.length) {
                    yAxisLabel = chartBase.yAxisLabel;
                }
                // chart.yAxis = <IAxis>{
                //     axisLabel: yAxisLabel,
                //     tickFormat: (d: any) => { return this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc(d); },
                //     showMaxMin: !chartBase.hideMaxMinY
                // };
            }, this));

            // make other chart specific alterations after init
        }
    }
// }