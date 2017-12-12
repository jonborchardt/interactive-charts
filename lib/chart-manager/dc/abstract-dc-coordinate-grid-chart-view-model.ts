/// <reference path="../../crossfilter-manager/crossfilter-manager.ts" />

// module InteractiveCharts.ChartManager.DcChart {
    "use strict";

    import * as d3 from "d3";

    import {
        IAbstractChartBase
    } from "../abstract-chart-view-model-base";

    import {
        AbstractDcChartViewModelBase,
        IAbstractDcChartViewModelBase
    } from "./abstract-dc-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

import {
    ValueType
} from "../../crossfilter-manager/key-metric-manager";

    // import CrossfilterManager = InteractiveCharts.CrossfilterManager; // todo: seems wrong
    // import Util = InteractiveCharts.Shared.Util;
    import * as Util from "../../shared/util";

    // chart def interface for DC charts that have xaxis, yaxis, brush, etc... (contains data on how to build the chartViewModel)
    export interface IAbstractDcCoordinateGridChart<T> extends IAbstractChartBase<T> {
        // shall the yaxis max update to reflect hat is currently filtered in the set? 
        elasticY?: boolean;

        // shallwe hide the brush (filter)
        brushOff?: boolean;

        // how many axis ticks should there be?
        xAxisTicks?: number;
        yAxisTicks?: number;

        // should we show the axis labels?
        showLabelX?: boolean;
        showLabelY?: boolean;

        // overrides the number of dots/lines/bard in charts from the group count to the passed in
        xUnitsOverride?: (start: any, end: any, step?: any) => Array<any>; // only usable on number/currency key types
    }


    // base view model class for DC charts that have an xaxis, yaxis, brush, etc...
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export interface IAbstractDcCoordinateGridChartViewModel<T> extends IAbstractDcChartViewModelBase<T> {
        x: any; // expected to be a d3 scale domain
        y?: any; // expected to be a d3 scale domain
        elasticY: boolean;
        brushOff: boolean;
        xAxisTicks?: number;
        xAxisTickFormat?: (d: any) => string;
        yAxisTicks?: number;
        yAxisTickFormat?: (d: any) => string;
        xAxisLabel?: string;
        yAxisLabel?: string;
        xUnitsOverride?: (start: any, end: any, step?: any) => Array<any>; // only usable on number/currency key types
    }


    // base view model class for DC charts that have an xaxis, yaxis, brush, etc...
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export class AbstractDcCoordinateGridChartViewModel<T> extends AbstractDcChartViewModelBase<T> implements IAbstractDcCoordinateGridChartViewModel<T> {
        public x: any; // expected to be a d3 scale domain
        public y: any; // expected to be a d3 scale domain
        public elasticY: boolean;
        public brushOff: boolean;
        public xAxisTicks: number;
        public xAxisTickFormat: (d: any) => string;
        public yAxisTicks: number;
        public yAxisTickFormat: (d: any) => string;
        public xAxisLabel: string;
        public yAxisLabel: string;
        public xUnitsOverride: (start: any, end: any, step?: any) => Array<any>; // only usable on number/currency key types
        private generatedAxisTicksX: Array<number>;

        constructor(chartBase: IAbstractDcCoordinateGridChart<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            // setting up axis info in AbstractDcCoordinateGridChartViewModel rather than base because not all charts need it
            var minX = this.chartBase.crossfilterGrouping.minX ? this.chartBase.crossfilterGrouping.minX : this.chartBase.crossfilterGrouping.key.min;
            var maxX = this.chartBase.crossfilterGrouping.maxX ? this.chartBase.crossfilterGrouping.maxX : this.chartBase.crossfilterGrouping.key.max;
            var minY = this.chartBase.crossfilterGrouping.minY ? this.chartBase.crossfilterGrouping.minY : 0;
            var maxY = this.chartBase.crossfilterGrouping.maxY ? this.chartBase.crossfilterGrouping.maxY : 100; // 100 is lame... but we don't know the min/max of the metrics
            if (chartBase.crossfilterGrouping.key.valueType === ValueType.DateTime) {
                this.x = d3.time.scale().domain([minX, maxX]);
            } else if (chartBase.crossfilterGrouping.key.valueType === ValueType.Number) {
                this.x = d3.scale.linear().domain([minX, maxX]);
            } else {
                console.log(Error("AbstractDcCoordinateGridChartViewModel is only usable by Date, Number and Currency ValueTypes: " +
                    this.chartBase.crossfilterGrouping.key.valueType));
            }
            if (Util.isDefinedAndNotNull(chartBase.crossfilterGrouping.minY) || Util.isDefinedAndNotNull(chartBase.crossfilterGrouping.maxY)) {
                this.y = d3.scale.linear().domain([minY, maxY]);
            }

            // hold on to values
            this.xUnitsOverride = chartBase.xUnitsOverride;
            this.elasticY = chartBase.elasticY;
            this.brushOff = chartBase.brushOff;
            // set ticks based on size if user has not specified ticks count
            this.xAxisTicks = (typeof chartBase.xAxisTicks !== "undefined") ? chartBase.xAxisTicks : Math.floor(this.width / 75);
            this.yAxisTicks = (typeof chartBase.yAxisTicks !== "undefined") ? chartBase.yAxisTicks : Math.floor(this.height / 26);

            // set tick formats
            this.xAxisTickFormat = (this.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.key.shortFormatFunc(d); } :
                this.chartBase.crossfilterGrouping.key.shortFormatFunc;
            this.yAxisTickFormat = (this.hideZeroTicks) ? (d: any) => { return (d === 0) ? "" : this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc(d); } :
                this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc;

            // generate axis ticks (needed because Axis().ticks does not appear to work)
            this.generatedAxisTicksX = [];
            for (var i = 0; i < this.xAxisTicks; i++) {
                this.generatedAxisTicksX.push((maxX - minX) / (this.xAxisTicks - 1) * i + minX);
            }

            // add labels and space for axis labels if we are to show thme
            if (chartBase.showLabelX) {
                this.xAxisLabel = this.chartBase.crossfilterGrouping.key.title;
                this.margin.bottom += 12;
            }
            if (chartBase.showLabelY) {
                this.yAxisLabel = this.chartBase.crossfilterGrouping.metrics[0].title; // using first one for DC
                this.margin.left += 12;
            }
        }

        // init sets up the AbstractDcCoordinateGridChart data
        public init(initExtension: (c: any) => void) {
            super.init((c: any) => {
                if (c.x && this.x) {
                    c.x(this.x);
                }
                if (c.y && this.y) {
                    c.y(this.y);
                }
                // use override if availiable
                if (this.xUnitsOverride && c.xUnits) {
                    c.xUnits(this.xUnitsOverride);
                } else if (c.xUnits) {
                    c.xUnits(() => {
                        return this.chartBase.crossfilterGrouping.groupCountOverride ? this.chartBase.crossfilterGrouping.groupCountOverride :
                            this.chartBase.crossfilterGrouping.group.all().length;
                    });
                }

                // set values
                if (c.elasticY) {
                    c.elasticY(this.elasticY);
                }
                if (c.brushOn) {
                    c.brushOn(!this.brushOff);
                }
                if (c.xAxis && c.xAxis().tickValues) {
                    c.xAxis().tickValues(this.generatedAxisTicksX); // use tickValue for x because we can
                }
                if (c.yAxis && c.yAxis().ticks) {
                    c.yAxis().ticks(this.yAxisTicks); // use tics for y because its all we have
                }
                if (c.xAxis && c.xAxis().tickFormat && this.xAxisTickFormat) {
                    c.xAxis().tickFormat(this.xAxisTickFormat);
                }
                if (c.yAxis && c.yAxis().tickFormat && this.yAxisTickFormat) {
                    c.yAxis().tickFormat(this.yAxisTickFormat);
                }
                if (c.xAxis && c.xAxisLabel && this.xAxisLabel) {
                    c.xAxisLabel(this.xAxisLabel);
                }
                if (c.yAxis && c.yAxisLabel && this.yAxisLabel) {
                    c.yAxisLabel(this.yAxisLabel);
                }
                // then call chart specific extensions
                initExtension(c);
            });
        }
    }
// }