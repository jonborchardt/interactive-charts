// module InteractiveCharts.ChartManager {
    "use strict";

    import "./chart-manager.less";
    import * as dc from "dc";
    import * as Util from "../shared/util";

    import {
        IAbstractChartBase,
        IAbstractChartViewModelBase,
        IModelState
    } from "./abstract-chart-view-model-base";

    import {
        IEventManager
    } from "../shared/event-manager";

    import {
        ICrossfilterManager
    } from "../crossfilter-manager/crossfilter-manager";

    /**
     * Defines all current valid chart types
     */
    export enum ChartType {
        simpleScalarChart,
        compositeScalarChart,
        frozenScalarChart,
        filterBarChart,
        filterRowChart,
        filterLineChart,
        filterPieChart,
        discreteBarChart,
        multiBarChart,
        stackedAreaChart,
        pieChart,
        rangeOnlyBoxPlotChart,
        lineChart,
        sparklineChart,
        multiChart,
        linePlusBarChart,
        oneFilterBarChart
    }; // add more as needed


    export interface IChartManager<T> {
        crossfilterManager: ICrossfilterManager<T>;
        eventManager: IEventManager;

        // should be called after all charts are created
        initializeCharts: () => void;

        // managing charts list
        addChart: (id: any, chartBase: IAbstractChartBase<T>) => void;
        getChart: (id: any) => IAbstractChartBase<T>;
        updateState: (modelState: IModelState, shouldRedraw: boolean) => void;

        // must register charts to use to avoid circular dependencies
        registerChart: (chartType: string, callback: (chart: IAbstractChartBase<T>, manager: ChartManager<T>) => IAbstractChartViewModelBase<T>) => void;
    }


    export class ChartManager<T> implements IChartManager<T> {
        private charts: Array<IAbstractChartBase<T>> = [];

        // must register charts to be built with the factory
        private registeredCharts: { [chartType: string]: ((chart: IAbstractChartBase<T>, manager: ChartManager<T>) => IAbstractChartViewModelBase<T>) } = {};

        /**
         * Chart factory method.
         * a) Creates a new chart based on client provided chart type.
         * b) Associates appropriate chart model
         * c) Assigns the id to the newly created chart
         * @param id
         * @param chartBase
         * @returns {AbstractChartViewModelBase<T>}
         */
        private buildChart(id: string, chartBase: IAbstractChartBase<T>) {
            var chart: IAbstractChartViewModelBase<T> = null;
            let func = this.registeredCharts[chartBase.chartType + ""];
            if (Util.isDefinedAndNotNull(func)) {
                chart = func(chartBase, this);
                chart.id = id;
            } else {
                console.log(Error("Chart type unsupported: " + chartBase.chartType));
                chart = null;
            }
            return chart;
        };

        /**
        * Cycles through all the chart models and invokes initialState method on each if applicable
        * @returns {boolean} : True if any initialization was invoked.  Else false.
        */
        // private initializeChartsState(): boolean {
        //     let shouldTriggerFilter: boolean = false;
        //     this.charts.forEach((chartBase: IAbstractChartBase<T>, index: number) => {
        //         if (chartBase.chartVm.initializeState) {
        //             shouldTriggerFilter = shouldTriggerFilter || chartBase.chartVm.initializeState();
        //         }
        //     });
        //     return shouldTriggerFilter;
        // }

        // must register charts to use to avoid circular dependencies
        public registerChart(chartType: string, callback: (chart: IAbstractChartBase<T>, manager: ChartManager<T>) => IAbstractChartViewModelBase<T>): void {
            this.registeredCharts[chartType] = callback;
        }

        /***
         * Should be called after all charts are created.  Performs operations like
         * a) Subscribe to the filtered event which may be published by a chart (for e.g. FilterBarChart)
         */
        public initializeCharts() {
            // subscribe AFTER charts to ensure to trigger correct refresh
            this.eventManager.subscribe("filtered", $.proxy(() => {
                var phase: string = this.rootScope.$$phase;
                if (phase !== "$apply" && phase !== "$digest" && this.rootScope.$apply) { // $apply not used in angular4
                    this.rootScope.$apply();
                }
            }, this));

            // let shouldTriggerFilter: boolean = this.initializeChartsState();
            // if (shouldTriggerFilter) {
            //     this.eventManager.publish("filtered", this);
            //     if (Util.isDefinedAndNotNull(dc)) {
            //         dc.redrawAll();
            //     }
            // }
        };


        /**
         * Add a chart to the chart manager collection and associates a corresponding Chart model to it
         * @param id: Unique identifier for the chart being added
         * @param chartBase: Abstract base for the kind of chart being added
         */
        public addChart(id: any, chartBase: IAbstractChartBase<T>) {
            var stringId: string = id.toString();
            var chart: IAbstractChartBase<T> = this.charts[stringId];

            if (Util.isDefinedAndNotNull(chart)) {
                console.log("Warning, a chart with the id " + stringId + " already exists, overwriting");
            }

            chartBase.chartVm = this.buildChart(stringId, chartBase);
            this.charts[stringId] = chartBase;
        };

        /**
         * Get the chart corresponding to the id
         * @param id: Unique identifier for the chart
         * @returns {IAbstractChartBase<T>}: Abstract base for the kind of chart
         */
        public getChart(id: any) {
            var stringId: string = id.toString();
            var chart: IAbstractChartBase<T> = this.charts[stringId];

            if (!Util.isDefinedAndNotNull(chart)) {
                console.log("Warning, a chart with the id " + stringId + " was not found");
            }
            return chart;
        };

        public updateState(chartModelState: IModelState, shouldRedraw: boolean) {
            if (chartModelState === null ||
                chartModelState.ids === null ||
                chartModelState.ids === undefined ||
                chartModelState.ids.length === 0) {
                console.log("Unable to update any chart.  Please use Non empty chart/name");
                return;
            }
            var chart: IAbstractChartBase<T> = this.getChart(chartModelState.ids[0]); // First Id at root is Chart id
            if (!Util.isDefinedAndNotNull(chart) || !Util.isDefinedAndNotNull(chart.chartVm)) {
                console.log("Unable to update any chart.  Please verify name matches chart id");
                return;
            }
            if (chartModelState.type !== "ChartRow") {
                chart.chartVm.updateState(chartModelState);
            }
            if (shouldRedraw) {
                if (Util.isDefinedAndNotNull(dc)) {
                    dc.redrawAll(); // Trigger redraw for now
                }
            }
        };

        constructor(
            private rootScope: ng.IRootScopeService,
            public crossfilterManager: ICrossfilterManager<T>,
            public eventManager: IEventManager) {
        }
    }
// }
