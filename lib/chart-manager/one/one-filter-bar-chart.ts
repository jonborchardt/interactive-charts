// OneFilterBarChart
// a One Filter based chart with bars aligned across the xaxis

// module InteractiveCharts.ChartManager.OneChart {
    "use strict";

    import "./one-chart.less";

    import * as d3 from "d3";
    import * as angular from "angular";
    import * as dc from "dc";
    import {
        max as lodash_max,
        debounce as lodash_debounce,
        map as lodash_map } from "lodash";

    import {
        AbstractOneFilterChartViewModelBase,
        IAbstractOneFilterChartBase,
        IAbstractOneFilterChartViewModelBase
    } from "./abstract-one-filter-chart-view-model-base";

    import {
        IFilterBarChartState,
        IModelState
    } from "../abstract-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";
import * as Util from "../../shared/util";

    // import Util = InteractiveCharts.Shared.Util;
    // import ChartManager = InteractiveCharts.ChartManager;

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IOneFilterBarChart<T> extends IAbstractOneFilterChartBase<T> {
        useOneCheckbox?: boolean;
        elasticY?: boolean;
        xAxisTicks?: number;
        showXAxis?: boolean;
        showValueText?: boolean;
        barWidth?: number;
        barHeight?: number;
        unitHeader?: string;
        labelTooltipOffsetLeft?: number;
        // add any additional options as we support them
    }


    // view model interface (the built chart)
    export interface IOneFilterBarChartViewModel<T> extends IAbstractOneFilterChartViewModelBase<T> {
        showXAxis?: boolean;
        showValueText?: boolean;
        barWidth?: number;
        barHeight?: number;
        unitHeader?: string;
        // add any additional options as we support them
    }

    export interface ISummaryData {
        total: number;
        max: number;
    }

    // view model class (use init to add most chart specific options)
    export class OneFilterBarChartViewModel<T> extends AbstractOneFilterChartViewModelBase<T> implements IOneFilterBarChartViewModel<T> {
        public useOneCheckbox: boolean;
        public elasticY: boolean;
        public xAxisTicks: number;
        public showXAxis: boolean;
        public showValueText: boolean;
        public barWidth: number;
        public barHeight: number;
        public labelWidth: number;
        public unitHeader: string;
        public labelTooltipOffsetLeft: number;
        private lastSelection: string;
        // get max value across dimensions
        private calculateMax: () => ISummaryData = (): ISummaryData => {
            var total: number = 0;
            var max: number = lodash_max([0.01, lodash_max(this.chartBase.crossfilterGrouping.group.top(Infinity).map((k: Util.ILabelKeyValueTuple): number => {
                total += this.chartBase.crossfilterGrouping.metrics[0].valueFunc(k);
                return this.chartBase.crossfilterGrouping.metrics[0].valueFunc(k);
            }))]);
            return <ISummaryData>{ total: total, max: max };
        };
        // convert to correct key string to use in dictionary
        private getKeyString: (o: Object) => string = (o: any): string => {
            return this.chartBase.crossfilterGrouping.key.shortFormatFunc(o);
        };
        public hasFilters: boolean = false;
        public summaryData: ISummaryData = this.calculateMax();

        // after the chart draws, do some stuff..once
        public onRender: () => void = (): void => {
            if (this.showXAxis) {
                // add axis
                var barWidth: number = this.barWidth - 8;
                var ticCount: number = Math.ceil(barWidth / 50); // 1 tic per 50 or so pixels
                if (Util.isDefinedAndNotNull((<IOneFilterBarChart<T>>this.chartBase).xAxisTicks)) {
                    ticCount = (<IOneFilterBarChart<T>>this.chartBase).xAxisTicks;
                }
                var selector = ".chart_" + this.id + " .axis";
                var svgContainer = d3.select(selector);
                var axisScale = d3.scale.linear()
                    .domain([0, this.summaryData.max])
                    .range([0, barWidth]);
                var xAxis = d3.svg.axis()
                    .ticks(ticCount)
                    .scale(axisScale)
                    .tickFormat(this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc);
                svgContainer.append("g")
                    .call(xAxis);
            }
            var tdSelector = ".chart_" + this.id + " .selectable-row td.dimension-name";
            d3.selectAll(tdSelector)
                .select(".dimension-name-tooltip")
                .attr("display", "none")
                .style("position", "absolute")
                .style("visibility", "hidden");

            var showTooltip = (elem: any) => {
                if (elem.node().offsetWidth !== elem.node().scrollWidth) {
                    var offsetLeft: number = this.labelTooltipOffsetLeft || this.width - this.barWidth - 22;
                    elem
                        .select(".dimension-name-tooltip")
                        .style("margin-left", offsetLeft + "px")
                        .attr("display", "inline")
                        .style("visibility", "visible")
                        .classed("active-tooltip", true)
                        .style("position", "absolute");
                }
            };
            var hideTooltip = (elem: any) => {
                elem
                    .select(".dimension-name-tooltip")
                    .classed("active-tooltip", false)
                    .style("visibility", "hidden");
            };
            d3.selectAll(tdSelector)
                .on("mouseover", function () {
                    showTooltip(d3.select(this));
                })
                .on("mouseout", function () {
                    hideTooltip(d3.select(this));
                });
        };

        /**
         * Map which correlates the key to a boolean state which indicates whether the corresponding individual bar/ checkbox
         * in the Bar chart graph is enabled or not.  The keys correspond to the evaluation of the value function of the metric/ dimension
         * on which this chart depends
         * @type {{string => boolean}}
         */
        public keyValues: { [key: string]: boolean; } = {};

        /**
         * Debounce the updateFiltersOp so we avoid un-necessary filter operations
         */
        public updateFilters: () => void = (): void => {
            lodash_debounce(
                () => {
                    this.updateFiltersOp();
                },
                600,
                { leading: false }
            )();
        };

        /**
         * Reset all the filter/selections
         */
        public filterAll: () => void = (): void => {
            this.keyValues = {};
            this.chartBase.crossfilterGrouping.group.top(Infinity).forEach((k: CrossFilter.Grouping<T, any>) => {
                this.keyValues[this.getKeyString(k.key)] = true;
            });
            this.hasFilters = false;
            this.updateFilters();
        };

        // make rowclick act as a checkbox click
        /**
         * Handler for event when a row in the bar chart is clicked.
         * a) Ensure that we set internal state in the keyValue collection based on selection
         * b) Notify other charts of change
         * @param event - Event containing information from UI elements about clicked row
         * @param row - Crossfilter group corresponding the the clicked row
         */
        public rowClicked: (event: Event, row: CrossFilter.Grouping<T, any>) => void = (event: Event, row: CrossFilter.Grouping<T, any>): void => {
            var clickedOnCheckBox: boolean = false;
            // .parents() is not part of jqLite (and jqLite is used in angular 4), we dont want to require jquery in the future
            // https://gist.github.com/eicu/db0d1464b2fd404f3882
            var aParent = angular.element(event.target).parent();
            var parents = [];
            while (aParent && !clickedOnCheckBox) {
                parents.push(aParent);
                aParent = aParent.parent();
                clickedOnCheckBox = true;
            }
            let keyStr: string = this.getKeyString(row.key);
            // check to see if there are selected filters for shift + click event
            if (this.eventManager.isShiftDown()) {
                let filteredKeys: Array<string> = [];
                lodash_map(this.keyValues, (val: any, key: string) => {
                    if (val === true) {
                        filteredKeys.push(key);
                    }
                });

                // when shift + click is received
                // filter selection to all off then pass in normal click to select the right one
                lodash_map(filteredKeys, (key: string) => {
                    this.keyValues[key] = false; // if false, its filtered out
                });

                // extra step for click on checkbox since checkbox updates ng-model automatically
                if (clickedOnCheckBox) {
                    this.keyValues[keyStr] = !this.keyValues[keyStr];
                }
            }

            // if clicked outside the checkbox we need to updateKeyValues
            // because checkbox updates ng-model automatically
            if (!clickedOnCheckBox) {
                this.keyValues[keyStr] = !this.keyValues[keyStr];
            }
            this.hasFilters = false;
            for (var key in this.keyValues) {
                if (this.keyValues.hasOwnProperty(key)) {
                    this.hasFilters = this.hasFilters || !this.keyValues[key]; // if false, its filtered out
                }
            }

            this.lastSelection = this.keyValues[keyStr] ? keyStr : undefined;
            this.updateFilters();
        };

        constructor(chartBase: IOneFilterBarChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);
            this.useOneCheckbox = Util.isDefinedAndNotNull(chartBase.useOneCheckbox) ? chartBase.useOneCheckbox : false;
            chartBase.colors = Util.isDefinedAndNotNull(chartBase.colors) ? chartBase.colors : ["#8d8d8d", "#87c9d9", "#e6e6e6"];

            this.chartType = "oneFilterBarChart";
            this.unitHeader = chartBase.unitHeader;
            this.labelTooltipOffsetLeft = chartBase.labelTooltipOffsetLeft;
            // set up filters
            this.chartBase.crossfilterGrouping.group.top(Infinity).forEach((k: CrossFilter.Grouping<T, any>) => {
                this.keyValues[this.getKeyString(k.key)] = true ;
            });

            // on filter all, reset our filters
            this.eventManager.subscribe("filterAll", (sender: any) => {
                if (this.id && this.id !== sender.id) {
                    this.filterAll();
                }
            });

            // on filtered, animate the bars
            this.eventManager.subscribe("filtered", (sender: any) => {
                if (this.id && this.id !== sender.id) {
                    var chartEl: any = document.getElementsByClassName("chart_" + this.id);
                    if (chartEl && chartEl.length > 0) {
                        var fgrounds: any = chartEl[0].getElementsByClassName("foreground");
                        for (var i = 0; i < fgrounds.length; i++) {
                            fgrounds[i].animate([{ transform: "scale(0, 1)" }, { transform: "scale(1, 1)" }], 500);
                        }
                    }
                }
            });

            // for elastic
            if (Util.isDefinedAndNotNull(chartBase.elasticY) && chartBase.elasticY) {
                // on filtered events, reset our axis
                this.eventManager.subscribe("filtered", (sender: any) => {
                    if (this.id && this.id !== sender.id) {
                        this.summaryData = this.calculateMax();
                        this.updateFilters();
                    }
                });
            }
            super.init(
                (c: any) => {
                    // 16px for checkbox + 7px for spacing
                    var checkboxAndSpacingWidth: number = 22;
                    this.showXAxis = Util.isDefinedAndNotNull(chartBase.showXAxis) ? chartBase.showXAxis : true;
                    this.showValueText = Util.isDefinedAndNotNull(chartBase.showValueText) ? chartBase.showValueText : true;
                    this.barWidth = chartBase.barWidth && chartBase.barWidth < this.width - checkboxAndSpacingWidth ?
                        chartBase.barWidth : (this.width - checkboxAndSpacingWidth) * 0.65;
                    this.barHeight = chartBase.barHeight || checkboxAndSpacingWidth;
                    this.labelWidth = Math.min(16, this.width - checkboxAndSpacingWidth - this.barWidth);

                    // can add additional class specific extensions here
                }
            );

            // make other chart specific alterations after init
        }

        /**
         * Applies filters on the chart dimension (based on the defined metric).  And then publish the "filtered" event.  This will
         * ensure that all other charts get in sync with changes.  Finally we have to let dc.js know about the changes
         */
        public updateFiltersOp: () => void = (): void => {
            this.chartBase.crossfilterGrouping.dimension.filterFunction((d: any): boolean => {
                let keyStr: string = this.getKeyString(d);
                return !Util.isDefinedAndNotNull(this.keyValues[keyStr]) || this.keyValues[keyStr];
            });
            this.eventManager.publish("filtered", this);
            if (Util.isDefinedAndNotNull(dc)) {
                dc.redrawAll();
            }
        };

        /**
         * Empty Map in initializeState is used to denote that no initialization is required
         * @returns {boolean}
         */
        public initializeState(): boolean {
            if (this.chartBase.initialState === undefined ||
                Object.keys(this.chartBase.initialState).length === 0 && this.chartBase.initialState.constructor === Object) {
                return false;
            }
            return this.updateState(this.chartBase.initialState, false);
        }

        public updateState(modelState: IModelState, shouldFireFilter: boolean = false): boolean {
            let chartState: IFilterBarChartState = <IFilterBarChartState>modelState;
            if (Util.isDefinedAndNotNull(chartState)) {
                this.updateFilterValues(chartState);
                if (shouldFireFilter) {
                    this.lastSelection = undefined; // Ensure that we are not caught in an infinite loop of updateStates
                    this.updateFiltersOp();
                } else {
                    this.chartBase.crossfilterGrouping.dimension.filterFunction((d: any): boolean => {
                        let keyStr: string = this.getKeyString(d);
                        return !Util.isDefinedAndNotNull(this.keyValues[keyStr]) || this.keyValues[keyStr];
                    });
                }
                return true;
            }
            return false;
        }

        /***
         * Just replacing the keyValues collection appears to cause inconsistency with filtering operation if empty/incomplete update state is passed.
         * @param chartState
         */
        private updateFilterValues(chartState: IFilterBarChartState): void {
            for (var key in this.keyValues) {
                if (this.keyValues.hasOwnProperty(key)) {
                    this.keyValues[key] = chartState.filterValues[key] !== undefined ? chartState.filterValues[key] : false;
                }
            }
        }
        public getState(): IModelState {
             return <IFilterBarChartState>{
                filterValues: this.keyValues
            };
        }

        public getLastSelection(): string {
            return this.lastSelection;
        }

        public resetLastSelection(): void {
            this.lastSelection = undefined;
        }
    }
// }