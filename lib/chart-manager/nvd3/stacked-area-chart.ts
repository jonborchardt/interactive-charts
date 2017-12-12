// StackedAreaChart: NVd3 based chart with multiple series stacked
// http://krispo.github.io/angular-nvd3/#/stackedAreaChart

"use strict";

import * as moment from "moment";
import * as Util from "../../shared/util";
import { CrossfilterGrouping } from "../../crossfilter-manager/crossfilter-grouping";
import {
    AbstractNvd3CoordinateGridChartViewModel,
    IAbstractNvd3CoordinateGridChart,
    IAbstractNvd3CoordinateGridChartViewModel
} from "./abstract-nvd3-coordinate-grid-chart-view-model";
import {
    ChartType,
    IChartManager
} from "../chart-manager";
import {
    INvd3Data,
    IStackedAreaChart,
    ITooltip
} from "./nvd3-interfaces";

export enum StackStyle {
    stacked,
    stream,
    expand // lowercase on purpose
}

// chart def interface (contains data on how to build the chartViewModel)
export interface IExtendedStackedAreaChart<T> extends IStackedAreaChart, IAbstractNvd3CoordinateGridChart<T> {
    showControls?: boolean;
    hideControls?: boolean;
    stackStyle?: StackStyle;
    style?: string;
    tooltip?: ITooltip;
    maxSecondaryStreamCount?: number;
    elasticXAxis?: boolean;
    maxTooltipKeyLen?: number;
    chartType: ChartType;
    sizeData: Util.ISizeData;
    crossfilterGrouping: CrossfilterGrouping<T>;

    // add any additional options as we support them
}

// view model interface (the built chart)
export interface IStackedAreaChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
    // add any additional options as we support them
}

// view model class (use init to add most chart specific nvd3 options)
export class StackedAreaChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements IStackedAreaChartViewModel<T> {
    constructor(chartBase: IExtendedStackedAreaChart<T>, chartManager: IChartManager<T>) {
        super(<IAbstractNvd3CoordinateGridChart<T>>chartBase, chartManager);

        var stackedAreaChartBase: IExtendedStackedAreaChart<T> = chartBase;

        this.chartType = "stackedAreaChart";

        // the stack chart has an elastic x axis... we can configure this in the future
        this.filterSeriesData = (series: INvd3Data[]) => {
            // filter to a smaller set of series
            // todo: move max count to this level
            if ("undefined" !== typeof stackedAreaChartBase.maxSecondaryStreamCount && null !== this.chartBase.crossfilterGrouping.dimensionSecondary) {
                // we reduce sum on the primary metric... we coud configure this in the future
                var groupsSecKeyArray = this.chartBase.crossfilterGrouping.dimensionSecondary
                    .group()
                    .reduceSum(this.chartBase.crossfilterGrouping.metrics[0].reduceFunc)
                    .top(stackedAreaChartBase.maxSecondaryStreamCount)
                    .map((gs) => { return gs.key; });
                // remove any series that nolonger has any data
                series = series.filter((s: INvd3Data) => {
                    return $.inArray(s.key, groupsSecKeyArray) >= 0;
                });
            }

            // expand the data by removing xAxis values that are null for all series
            if ("undefined" !== typeof stackedAreaChartBase.elasticXAxis && stackedAreaChartBase.elasticXAxis) {
                let minDate = moment("5000 01 01", "YYYY MM DD");
                let maxDate = moment("1000 01 01", "YYYY MM DD");
                series.forEach((s) => {
                    s.values.forEach((v) => {
                        if (Util.isDefinedAndNotNull(v.value)) {
                            minDate = moment.min(v.key, minDate);
                            maxDate = moment.max(v.key, maxDate);
                        }
                    });
                });
                // remove any point that is outside of the min and max of non null values
                series.forEach((s) => {
                    s.values = s.values.filter((p: Util.ILabelKeyValueTuple) => { return (p.label >= minDate && p.label <= maxDate); });
                });

                // remove any series that no longer has any data
                series.filter((s: INvd3Data) => {
                    return s.values.length > 0;
                });
            }
            return series;
        };

        super.init($.proxy((c: any) => {
            // make other chart specific alterations after init
            let chart: IStackedAreaChart = c.chart;

            if (chartBase.hideControls) {
                chart.showControls = !chartBase.hideControls;
            }
            if (chartBase.stackStyle) {
                chart.style = StackStyle[chartBase.stackStyle]; // hack to get string name of stackStyle
            }
            chart.tooltip.contentGenerator = (d: any, lineCharMax?: number) => { return Util.multiSeriesContentGenerator(d, chartBase.maxTooltipKeyLen); };

        }, this));
    }
}
