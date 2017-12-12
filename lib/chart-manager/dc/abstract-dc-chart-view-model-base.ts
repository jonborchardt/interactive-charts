"use strict";

import "node_modules/dc/dc.min.css";

import {
    AbstractChartViewModelBase,
    IAbstractChartBase,
    IAbstractChartViewModelBase
} from "../abstract-chart-view-model-base";

import { IChartManager } from "../chart-manager";
import { IMetric } from "../../crossfilter-manager/key-metric-manager";
import { IDcOptions } from "../../shared/util";

// chart def interface for all DC charts (contains data on how to build the chartViewModel)
export interface IAbstractDcChartBase<T> extends IAbstractChartBase<T> {
    // dont show the title
    hideFilterTitle?: boolean;

    // dont show the reset button
    hideFilterReset?: boolean;

    // dont show the list of what is filtered
    hideFilterSelectedRange?: boolean;
}


// base view model class for all DC charts
// none of the properties should be altered (readonly is not supported by typescript yet)
export interface IAbstractDcChartViewModelBase<T> extends IAbstractChartViewModelBase<T> {
    // init is called inside the dcPostSetupChart at the end, use it to augment the chart based on the specific chart you are generating
    init: (initExtension: (c: any) => void) => void;

    // dc specific values
    dcOptions: IDcOptions;
    dcPostSetupChart: (chart: any) => void;
}


// base view model class for all DC charts
// none of the properties should be altered (readonly is not supported by typescript yet)
export class AbstractDcChartViewModelBase<T> extends AbstractChartViewModelBase<T> implements IAbstractDcChartViewModelBase<T> {
    public dcOptions: IDcOptions;
    public dcPostSetupChart: (chart: any) => void;

    constructor(chartBase: IAbstractDcChartBase<T>, chartManager: IChartManager<T>) {
        super(chartBase, chartManager);
        if (this.chartBase.crossfilterGrouping.metricIds.length !== 1) {
            console.log(Error("filter charts (dc) are required to have exactly 1 metric: found " +
                this.chartBase.crossfilterGrouping.metricIds.length + " in chart " + this.chartBase.title));
        }
    }

    // init sets up the dc data
    public init(initExtension: (c: any) => void) {
        // grab first metric (currently only using the first dc metric in most cases, TODO: use stacks for the rest)
        let firstMetric: IMetric<T> = this.chartBase.crossfilterGrouping.metrics[0];
        // build options
        this.dcOptions = <IDcOptions>{
            // default label (what you see on hover/tooltip)
            title: $.proxy(function (p: any) {
                return this.chartBase.crossfilterGrouping.key.longFormatFunc(p.key) + ": " + firstMetric.shortFormatFunc(firstMetric.valueFunc(p)) + " " + firstMetric.title;
            }, this),
            // default title (label you see on a bar/pie slice/etc)
            label: $.proxy(function (p: any) {
                return this.chartBase.crossfilterGrouping.key.shortFormatFunc(p.key);
            }, this),
            // default filter printer (what you see when you do a filter)
            filterPrinter: $.proxy(function (filters: any) {
                if (Object.prototype.toString.call(filters[0]) === "[object Array]") {
                    return this.chartBase.crossfilterGrouping.key.longFormatFunc(filters[0][0]) + " -> " + this.chartBase.crossfilterGrouping.key.longFormatFunc(filters[0][1]);
                } else {
                    return filters.map((f: any) => { return this.chartBase.crossfilterGrouping.key.longFormatFunc(f); }).join(", ");
                }
            }, this),
            // set default callback on filter event for this chart
            onFiltered: $.proxy((d: any) => {
                // let others know about our filter event
                this.eventManager.publish("filtered", this);
            }, this)
        };

        // build postSetupChart (then call initExtension)
        this.dcPostSetupChart = $.proxy(function (c: any): void {
            if (c.valueAccessor) {
                c.valueAccessor(firstMetric.valueFunc); // dc always only uses first metric
            }
            if (c.margins) {
                c.margins(this.margin);
            }
            if (c.width) {
                c.width(this.width);
            }
            if (c.height) {
                c.height(this.height);
            }
            if (c.dimension) {
                c.dimension(this.chartBase.crossfilterGrouping.dimension);
            }
            if (c.group) {
                c.group(this.chartBase.crossfilterGrouping.group);
            }
            if (c.colors && this.colors) {
                c.colors(this.colors);
            }
            if (c.colorAccessor && this.colorAccessor) {
                c.colorAccessor(this.colorAccessor);
            }
            // default
            if (c.centerBar) {
                c.centerBar(true);
            }
            if (c.gap) {
                c.gap(1);
            }
            if (c.alwaysUseRounding) {
                c.alwaysUseRounding(true);
            }
            if (c.renderHorizontalGridLines) {
                c.renderHorizontalGridLines(true);
            }
            // save on click, and wrap it with our shift click version
            var currentClick = c.onClick;
            c.onClick = $.proxy(function (event) {
                // the only case that is different is shift click when all options are on
                // in the shift case, we want to deselect the clicked one
                // in the regular case, we select the clicked one and deselect the rest
                var filters = c.filters();
                if (this.eventManager.isShiftDown() && filters.length === 0) {
                    // when shift, and filter is null, instead of filtering on the selected key, we want to filter on all all keys
                    // then pass in normal click to deselect the right one
                    var keys = this.chartBase.crossfilterGrouping.group.top(Infinity);
                    filters.length = keys.length;
                    for (var i = 0; i < keys.length; i++) {
                        filters[i] = keys[i].key;
                    }
                }

                // we then pass on the click to the original event handeler so that the item just clikced will be deselected
                // there might be a better way to do this, but this is quick and farily clean (no need to alter external library)
                currentClick(event);
            }, this);

            // add chart specific extensions
            initExtension(c);
        }, this);
    }
}
