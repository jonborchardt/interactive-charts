// FilterPieChart
// a dc based chart pie slices
// https://tomneyland.github.io/angular-dc/example/stocks/nasdaq.html

// module InteractiveCharts.ChartManager.DcChart {
    "use strict";

    import "./interactive-dc-chart.tpl.html";
    import "./interactive-filter-chart-summary.tpl.html"; // TODO: needed?
    import "./dc-chart.less";

    import {
        AbstractDcChartViewModelBase,
        IAbstractDcChartBase,
        IAbstractDcChartViewModelBase
    } from "./abstract-dc-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IFilterPieChart<T> extends IAbstractDcChartBase<T> {
        slicesCap?: number;
        innerRadius?: number;
        // add any additional options as we support them
    }


    // view model interface (the built chart)
    export interface IFilterPieChartViewModel<T> extends IAbstractDcChartViewModelBase<T> {
        innerRadius?: number;
        slicesCap: number;
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific dc options)
    export class FilterPieChartViewModel<T> extends AbstractDcChartViewModelBase<T> implements IFilterPieChartViewModel<T> {
        public innerRadius: number;
        public slicesCap: number;

        constructor(chartBase: IFilterPieChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartType = "pieChart";

            // the pie chart uses a slightly different key value pair, and we want to convert it to what the generic charts expect
            var firstMetric: IMetric<T> = this.chartBase.crossfilterGrouping.metrics[0];
            var valueFuncWrapper = $.proxy(function (p: any) {
                if (p.data) {
                    p = p.data;
                }
                if (p.key === "Others") {
                    return p.value;
                }
                if (!p.value || !p.value.value) {
                    return 0.001;
                }
                var ret: number = Math.max(0.001, firstMetric.valueFunc(p)); // piechart does not deal with zero very well
                return ret;
            }, this);

            // set inner radius to defaulot size if not specified
            this.innerRadius = chartBase.innerRadius ? chartBase.innerRadius : Math.min(this.width, this.height) / 4;
            this.slicesCap = chartBase.slicesCap;

            super.init(
                (c: any) => {
                    // can add additional class specific extensions here
                    if (c.valueAccessor) {
                        c.valueAccessor(valueFuncWrapper); // trumps base
                    }
                    if (c.slicesCap && this.slicesCap) {
                        c.slicesCap(this.slicesCap);
                    }
                    if (c.innerRadius && this.innerRadius) {
                        c.innerRadius(this.innerRadius);
                    }
                }
            );

            // make other chart specific alterations after init
            // trump title
            this.dcOptions.title = $.proxy(function (p: any) {
                return this.chartBase.crossfilterGrouping.key.longFormatFunc(p.data ? p.data.key : p.key) + ": " +
                    firstMetric.shortFormatFunc(valueFuncWrapper(p)) + " " + firstMetric.title;
            }, this);
        }
    }
// }