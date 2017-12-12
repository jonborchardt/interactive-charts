// FilterSummaryChart
// a dc based chart showing x of y filtered
// https://tomneyland.github.io/angular-dc/example/stocks/nasdaq.html

// module InteractiveCharts.ChartManager.DcChart {
    "use strict";
    import "./dc-chart.less";

    import * as dc from "dc";

    // import CrossfilterManager = InteractiveCharts.CrossfilterManager; // todo: seems wrong
    import {
        ICrossfilterManager
    } from "../../crossfilter-manager/crossfilter-manager";
    export interface IFilterChartSummaryVm<T> {
        resetAll: () => void;
        dimension: CrossFilter.CrossFilter<T>;
        group: CrossFilter.GroupAll<T, {}>;
        recordName?: string;
        crossfilterManager: ICrossfilterManager<T>;

        // override values to handle the hidden items
        totalNonHiddenRecords: number;
        nonHiddenInFilter: number;
    }

    export class FilterChartSummaryVm<T> implements IFilterChartSummaryVm<T> {
        public resetAll: () => void;
        public dimension: CrossFilter.CrossFilter<T>;
        public group: CrossFilter.GroupAll<T, {}>;

        // override values to handle the hidden items
        public totalNonHiddenRecords: number = null;
        public nonHiddenInFilter: number = null;

        constructor(public crossfilterManager: ICrossfilterManager<T>, public recordName: string = null) {
            this.dimension = crossfilterManager.xfilter;
            this.group = crossfilterManager.xfilter.groupAll();
            this.resetAll = () => {
                dc.filterAll();
                this.crossfilterManager.eventManager.publish("filterAll", this);
                dc.redrawAll();
            };

            // override values to handle the hidden items
            this.totalNonHiddenRecords = crossfilterManager.getAllNonHiddenItemCount();
            this.nonHiddenInFilter = this.totalNonHiddenRecords;

            // update data if crossfilter filtered event
            this.crossfilterManager.eventManager.subscribe("filtered", $.proxy(() => { this.nonHiddenInFilter = this.crossfilterManager.getAllNonHiddenItemCount(); }, this));
        }
    }
// }