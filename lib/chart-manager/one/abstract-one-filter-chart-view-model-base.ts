// module InteractiveCharts.ChartManager.OneChart {
    "use strict";

    import {
        AbstractChartViewModelBase,
        IAbstractChartBase,
        IAbstractChartViewModelBase
    } from "../abstract-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

    export interface IOneFilterOptions {
    }

    // chart def interface for all One Filter charts (contains data on how to build the chartViewModel)
    export interface IAbstractOneFilterChartBase<T> extends IAbstractChartBase<T> {
        // dont show the title
        hideFilterTitle?: boolean;

        // dont show the reset button
        hideFilterReset?: boolean;

        // dont show the list of what is filtered
        hideFilterSelectedRange?: boolean;
    }


    // base view model interface for all One Filter charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export interface IAbstractOneFilterChartViewModelBase<T> extends IAbstractChartViewModelBase<T> {
        init: (initExtension: (c: any) => void) => void;

        oneFilterOptions: IOneFilterOptions;
    }


    // base view model class for all One Filter charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export class AbstractOneFilterChartViewModelBase<T> extends AbstractChartViewModelBase<T> implements IAbstractOneFilterChartViewModelBase<T> {
        public oneFilterOptions: IOneFilterOptions;

        constructor(chartBase: IAbstractOneFilterChartBase<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            if (this.chartBase.crossfilterGrouping.metricIds.length !== 1) {
                console.log(Error("filter charts (One Filter) are required to have exactly 1 metric: found " +
                    this.chartBase.crossfilterGrouping.metricIds.length + " in chart " + this.chartBase.title));
            }
        }

        // init sets up the One Filter data
        public init(initExtension: (c: any) => void) {
            // build options
            this.oneFilterOptions = <IOneFilterOptions>{};
            initExtension(this.oneFilterOptions);
        }
    }
// }