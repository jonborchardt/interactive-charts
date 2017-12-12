/// <reference path="angular/interactive-charts-components.ts" />
/// <reference path="../shared/defaults.ts" />
/// <reference path="../shared/event-manager.ts" />
/// <reference path="../shared/util.ts" />

// module InteractiveCharts.ChartManager {
    "use strict";

    import {
        ChartType,
        IChartManager
    } from "./chart-manager";

    import {
        CrossfilterGrouping
    } from "../crossfilter-manager/crossfilter-grouping";

    import {
        IEventManager
    } from "../shared/event-manager";

    import * as Util from "../shared/util";
    import * as CrossfilterManager from "../crossfilter-manager/crossfilter-manager";

    export interface IModelState {
        ids?: Array<string>; // at root level, holds the chart id.  At child level, can hold title/description
        isVisible?: boolean; // to display or not
        type: string;
        modelStates?: Array<IModelState>;
        groupTitle?: string;
        headerTooltip?: string;
        description?: string; // description used in drag/drop chart selection
    }

    export interface IFilterBarChartState extends IModelState {
        filterValues: { [key: string]: boolean; };
    }

    // chart def interface (contains data on how to build the chartViewModel)
    // this is the most base layer of charts, values here are shared by all charts
    export interface IAbstractChartBase<T> {
        chartType: ChartType;
        type: string; // temporarily added to fix tscompile error

        crossfilterGrouping: CrossfilterGrouping<T>;

        classes?: string;

        // how big is the chart?
        sizeData: Util.ISizeData;

        // what is the chart called?
        title: string;

        // hide "0" tick labels?
        hideZeroTicks?: boolean;

        // custom colors
        colors?: Array<string>;
        colorAccessor?: (series: any, index: number) => number;

        // constructed chart
        chartVm?: IAbstractChartViewModelBase<T>;
        initialState?: IModelState;
        hideChart?: boolean;
    }


    // view model interface (the built chart) for all charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export interface IAbstractChartViewModelBase<T> {
        id: string;
        classes?: string;

        // type is used by dc/nvd3 to select which chart to fabricate, 
        chartType: string;
        type: string; // temporarily added to fix tscompile error

        // data used to build this chart
        chartBase: IAbstractChartBase<T>;

        // shared event manager for charts to talk with eachother
        eventManager: IEventManager;

        // custom colors
        colors?: Array<string>;
        colorAccessor?: (series: any, index: number) => number;

        // size data
        width: number;
        height: number;
        margin: Util.IMarginObj;

        // whether to show "0" as tick label
        // does not apply to nvd3:stackedAreaChart
        hideZeroTicks?: boolean;
		/**
		 * Default is Noop.  However, can be used to set initial state of this chart model
		 */
        initializeState?: () => boolean;
        /**
         * Default is Noop.  Return value can be used to indicate success/failure of the update
         * @param modelState
         */
        updateState: (modelState: IModelState) => boolean;
    }


    // base view model class for all charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export class AbstractChartViewModelBase<T> implements IAbstractChartViewModelBase<T> {
        public id: string;
        public classes: string;
        public chartType: string;
        public type: string;
        public chartBase: IAbstractChartBase<T>;
        public colors: Array<string>;
        public colorAccessor: (series: any, index: number) => number;
        public width: number;
        public height: number;
        public margin: Util.IMarginObj;
        public eventManager: IEventManager;
        public hideZeroTicks: boolean;
        constructor(chartBase: IAbstractChartBase<T>, chartManager: IChartManager<T>) {
            // hold on to chartBase
            this.chartBase = chartBase;

            // attach css classes to this chart
            this.classes = chartBase.classes;

            // hold on to event manager
            this.eventManager = chartManager.eventManager;

            // set style
            this.colors = chartBase.colors;
            this.colorAccessor = chartBase.colorAccessor;
            this.margin = chartBase.sizeData.margin;
            this.width = chartBase.sizeData.width;
            this.height = chartBase.sizeData.height;
            this.hideZeroTicks = Util.isDefinedAndNotNull(chartBase.hideZeroTicks) ? chartBase.hideZeroTicks : false;
        }

        public initializeState(): boolean { return false; } // default noop

        /**
         *  Updates the model
         * @param modelState - State to be updated
         * @returns {boolean} - success of state Update Operation
         */
        public updateState(modelState: IModelState): boolean { return false; } // default noop
    }
// }