// an NVd3 based chart with one series of bars aligned across the xaxis
// http://krispo.github.io/angular-nvd3/#/discreteBarChart

"use strict";

import "./interactive-nvd3-chart.tpl.html";

import * as nvd3 from "./nvd3-interfaces";
import * as Util from "../../shared/util";

import {
    AbstractNvd3CoordinateGridChartViewModel,
    IAbstractNvd3CoordinateGridChart,
    IAbstractNvd3CoordinateGridChartViewModel
} from "./abstract-nvd3-coordinate-grid-chart-view-model";

import {
    IChartManager
} from "../chart-manager";

// chart def interface (contains data on how to build the chartViewModel)
export interface IDiscreteBarChart<T> extends IAbstractNvd3CoordinateGridChart<T> {
    showValues?: boolean;
    nullLabel?: string;
    // add any additional options as we support them
}

// view model interface (the built chart)
export interface IDiscreteBarChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
    // add any additional options as we support them
}

// view model class (use init to add most chart specific nvd3 options)
export class DiscreteBarChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements IDiscreteBarChartViewModel<T> {
    constructor(chartBase: IDiscreteBarChart<T>, chartManager: IChartManager<T>) {
        super(chartBase, chartManager);

        this.chartType = "discreteBarChart";
        super.init($.proxy((c: any) => {
            // make other chart specific alterations after init
            var chart: IDiscreteBarChart<T> = c.chart;

            // we dont show minMaxX in discrete charts
            // chart.xAxis.showMaxMin = !this.hideMaxMinX;

            if (chartBase.showValues) {
                chart.showValues = chartBase.showValues;
            }

            if (this.chartBase.crossfilterGrouping.metrics.length > 1) {
                console.log(Error("Expecting 1 metric, found: " + this.chartBase.crossfilterGrouping.metrics.length));
            }
            // chart.valueFormat = (d: any) => {
            //     if (Util.isDefinedAndNotNull(chartBase.nullLabel) && !Util.isDefinedAndNotNull(d)) {
            //         return chartBase.nullLabel;
            //     } else {
            //         return this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc(d);
            //     }
            // };
            // chart.tooltip.contentGenerator = (d: any, lineCharMax?: number) => { return Util.multiSeriesContentGenerator(d, chartBase.maxTooltipKeyLen); };

        }, this));
    }
}
