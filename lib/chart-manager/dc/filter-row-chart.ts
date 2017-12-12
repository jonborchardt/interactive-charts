// FilterRowChart
// a dc based chart with rowBars aligned across the yaxis
// https://tomneyland.github.io/angular-dc/example/stocks/nasdaq.html

// module InteractiveCharts.ChartManager.DcChart {
    "use strict";

    import "./interactive-dc-chart.tpl.html";
    import "./interactive-filter-chart-summary.tpl.html"; // TODO: needed?
    import "./dc-chart.less";

    import {
        IAbstractChartViewModelBase
    } from "../abstract-chart-view-model-base";

    import {
        AbstractDcChartViewModelBase,
        IAbstractDcChartBase
    } from "./abstract-dc-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";

    import * as Util from "../../shared/util";

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IFilterRowChart<T> extends IAbstractDcChartBase<T> {
        rowCap?: number; // max number of rows to show, shows 'other row' for the rest (rowCap + ordering forces hiding the others row)
        ordering?: (d: CrossFilter.Grouping<string, number>) => number; // what order to show the rows in (rowCap + ordering forces hiding the others row)
        xAxisTicks?: number;
        fixedBarHeight?: number; // force each bar to have a specific height (like 22)
        dynamicHeight?: boolean; // false allows control to size based on number of rows
        hideOthers?: boolean; // false hids the others row (if it was going to show)
        labelOffsetX?: number;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface IFilterRowChartViewModel<T> extends IAbstractChartViewModelBase<T> {
        rowCap?: number;
        ordering?: (d: CrossFilter.Grouping<string, number>) => number;
        xAxisTicks: number;
        xAxisTickFormat: (d: any) => string;
        fixedBarHeight?: number;
        dynamicHeight?: boolean;
        hideOthers?: boolean;
        labelOffsetX?: number;
        // add any additional options as we support them
    }

    // view model class (use init to add most chart specific dc options)
    export class FilterRowChartViewModel<T> extends AbstractDcChartViewModelBase<T> implements IFilterRowChartViewModel<T> {
        public valueFuncWrapper: (d: any) => number;
        public rowCap: number;
        public ordering: (d: CrossFilter.Grouping<string, number>) => number;
        public xAxisTicks: number;
        public xAxisTickFormat: (d: any) => string;
        public fixedBarHeight: number;
        public dynamicHeight: boolean;
        public hideOthers: boolean;
        public labelOffsetX: number;

        constructor(chartBase: IFilterRowChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);
            this.chartType = "rowChart";

            // the row chart uses a slightly different key value pair, and we want to convert it to what the generic charts expect
            var firstMetric: IMetric<T> = this.chartBase.crossfilterGrouping.metrics[0];
            var valueFuncWrapper = $.proxy(function (p: any) {
                if (p.key === "Others") {
                    return p.value;
                }
                return firstMetric.valueFunc(p);
            }, this);

            // hold on to specific chart values
            this.rowCap = chartBase.rowCap;
            this.ordering = chartBase.ordering;
            this.fixedBarHeight = chartBase.fixedBarHeight;
            this.dynamicHeight = Util.isDefinedAndNotNull(chartBase.dynamicHeight) ? chartBase.dynamicHeight : true;
            this.hideOthers = chartBase.hideOthers;
            this.labelOffsetX = chartBase.labelOffsetX;

            // update axis (the xAxis of a rowChart shows the METRIC)
            this.xAxisTicks = chartBase.xAxisTicks ? chartBase.xAxisTicks : Math.floor(this.width / 55);
            this.xAxisTickFormat = (this.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : firstMetric.shortFormatFunc(d); } : firstMetric.shortFormatFunc;

            super.init(
                (c: any) => {
                    // can add additional class specific extensions here
                    if (c.valueAccessor) {
                        c.valueAccessor(valueFuncWrapper);
                    }
                    if (c.cap && this.rowCap) {
                        c.cap(this.rowCap);
                    }
                    if (c.ordering && this.ordering) {
                        c.ordering(this.ordering);
                    }
                    if (c.xAxis && c.xAxis().ticks && this.xAxisTicks) {
                        c.xAxis().ticks(this.xAxisTicks);
                    }
                    if (c.xAxis && c.xAxis().tickFormat && this.xAxisTickFormat) {
                        c.xAxis().tickFormat(this.xAxisTickFormat);
                    }
                    if (c.fixedBarHeight && this.fixedBarHeight) {
                        c.fixedBarHeight(this.fixedBarHeight);
                    }
                    if (c.labelOffsetX && this.labelOffsetX) {
                        c.labelOffsetX(this.labelOffsetX);
                    }
                    // hide others if specified
                    if (this.hideOthers) {
                        c.data($.proxy(function (group) {
                            var topRows = c._computeOrderedGroups(group.top(Infinity));
                            // limit to cap if specified
                            if (c.cap && this.rowCap) {
                                topRows = topRows.slice(0, this.rowCap);
                            }
                            return topRows;
                        }, this));
                    } else if (c.cap && this.rowCap && c.ordering && this.ordering) {
                        // cap + ordering disalows 'others' bucket
                        // this code fixes the ordering to sort BEFORE cap.... seems like a bug in dc...
                        c.data($.proxy(function (group) {
                            var topRows = c._computeOrderedGroups(group.top(Infinity));
                            topRows = topRows.slice(0, this.rowCap);
                            return topRows;
                        }, this));
                    }

                    // float height if specified (this.fixedBarHeight is required)
                    if (!this.dynamicHeight && this.fixedBarHeight) {
                        c.height(c.data().length * (this.fixedBarHeight + 1) + 5 + this.margin.bottom + this.margin.top);
                    } else if (!this.dynamicHeight) {
                        console.log(Error("dynamicHeight=false requires fixedBarHeight to be defined"));
                    }
                }
            );

            // trump title
            this.dcOptions.title = $.proxy(function (p: any) {
                return this.chartBase.crossfilterGrouping.key.longFormatFunc(p.key) + ": " + firstMetric.shortFormatFunc(valueFuncWrapper(p)) + " " + firstMetric.title;
            }, this);

            // make other chart specific alterations after init
        }
    }
// }