"use strict";

import "../../../node_modules/nvd3/build/nv.d3.css";
import { Moment } from "moment";

import {
    AbstractChartViewModelBase,
    IAbstractChartBase,
    IAbstractChartViewModelBase
} from "../abstract-chart-view-model-base";

import {
    IAxis,
    ICaption,
    INvd3Data,
    IExtendedNvd3Data,
    INvd3Options
} from "./nvd3-interfaces";

import { IChartManager } from "../chart-manager";
import { IMetric } from "../../crossfilter-manager/key-metric-manager";
import * as Util from "../../shared/util";

// chart def interface for all NVD3 charts (contains data on how to build the chartViewModel)
export interface IAbstractNvd3ChartBase<T> extends IAbstractChartBase<T> {
    hideLegend?: boolean;
    floatLegend?: boolean;
    legendMargin?: Util.IMarginObj;
    hideTitle?: boolean;
    hideXAxisLabel?: boolean;
    hideTooltips?: boolean;
    maxTooltipKeyLen?: number;
    caption?: string;
    orderFunc?: Util.INamedOrderFunc;
    manipulateFinalDataFunc?: (originalData: Array<IExtendedNvd3Data>) => Array<IExtendedNvd3Data>;
    displayMetricAsCumulativeSeries?: (metric: IMetric<T>, seriesId?: number) => boolean;
    displayMetricAsRunningAverageSeries?: (metric: IMetric<T>, seriesId?: number) => boolean;
    saveUnfilteredData?: boolean;
    unfilteredTitleAppend?: string;
    displayMetricUnfilteredSeries?: (metric: IMetric<T>, seriesId?: number) => boolean;
    treatZerosAsNulls?: boolean;
    clipData?: (metric: IMetric<T>, seriesId?: number) => IClipData;
    selectedMetricGroupIndex?: number;
    metricToggleGroups?: Array<{ label: string, ids: Array<string> }>;
}

export interface IClipData {
    max: (number | Moment);
    displayZeros: boolean;
}

export interface INgNvd3Config {
    extended?: boolean;
    visible?: boolean;
    disabled?: boolean;
    refreshDataOnly?: boolean;
    deepWatchOptions?: boolean;
    deepWatchData?: boolean;
    deepWatchDataDepth?: number;
    debounce?: number;
    debounceImmediate?: boolean;
}

export interface IExtendedNvd3Data extends INvd3Data {
    index?: number;
    values?: any[];
}

// base view model class for all NVD3 charts
// none of the properties should be altered (readonly is not supported by typescript yet)
export interface IAbstractNvd3ChartViewModelBase<T> extends IAbstractChartViewModelBase<T> {
    init: (initExtension: (c: any) => void) => void;

    // nvd3 specific values
    nvd3Options: INvd3Options;
    nvd3Data: Array<IExtendedNvd3Data>;
    ngNvd3Config: INgNvd3Config;
    orderFunc: Util.INamedOrderFunc;
    manipulateFinalDataFunc?: (originalData: Array<INvd3Data>) => Array<INvd3Data>;
    reOrderData: (orderFunc: Util.INamedOrderFunc) => void;
    maxTooltipKeyLen?: number;
    metricsSelected?: Array<string>;
    selectedMetricGroupIndex?: number;
    metricToggleGroups?: Array<{ label: string, ids: Array<string> }>;
    hideXAxisLabel?: boolean;
}


// base view model class for all NVD3 charts
// none of the properties should be altered (readonly is not supported by typescript yet)
export class AbstractNvd3ChartViewModelBase<T> extends AbstractChartViewModelBase<T> implements IAbstractNvd3ChartViewModelBase<T> {
    public nvd3Options: INvd3Options;
    public nvd3Data: Array<IExtendedNvd3Data>;
    public ngNvd3Config: any;
    public dataMapFunc: () => Array<IExtendedNvd3Data> = null;
    public setSelectedMetric: (groupId: string) => void;
    public orderFunc: Util.INamedOrderFunc = null;
    public manipulateFinalDataFunc: (originalData: Array<INvd3Data>) => Array<INvd3Data> = null;
    public reOrderData: (orderFunc: Util.INamedOrderFunc) => void = null;
    public mapPointData: (point: Util.ILabelKeyValueTuple) => Util.ILabelKeyValueTuple;
    public filterPointData: (points: Array<Util.ILabelKeyValueTuple>) => Util.ILabelKeyValueTuple[];
    public mapSeriesData: (series: INvd3Data, metric: IMetric<T>, seriesId: number) => INvd3Data;
    public metricsSelected?: Array<string>;
    public selectedMetricGroupIndex: number;
    public metricToggleGroups?: Array<{ label: string, ids: Array<string> }>;
    public filterSeriesData: (series: Array<IExtendedNvd3Data>) => IExtendedNvd3Data[];
    public maxTooltipKeyLen: number;
    public hideXAxisLabel: boolean;
    private reMapData: () => void = null;
    private addSeries: (seriesList: Array<INvd3Data>, dataArray: CrossFilter.Grouping<any, any>[], groupSecondary?: CrossFilter.Grouping<any, any>) => void;
    private unfilteredObjectStore: Array<CrossFilter.Grouping<any, any>> = [];
    private currentOrderFunc: Util.INamedOrderFunc = null;

    constructor(chartBase: IAbstractNvd3ChartBase<T>, chartManager: IChartManager<T>) {
        super(chartBase, chartManager);

        this.orderFunc = chartBase.orderFunc;
        this.manipulateFinalDataFunc = chartBase.manipulateFinalDataFunc;
        this.hideXAxisLabel = chartBase.hideXAxisLabel ? chartBase.hideXAxisLabel : false;

        this.reOrderData = (orderFunc: Util.INamedOrderFunc) => {
            this.orderFunc = orderFunc;
            this.reMapData();
        };
        this.reMapData = $.proxy(() => { this.nvd3Data = this.dataMapFunc(); }, this);
        // store original unfiltered dataset
        // this is used for when we want to show a series's original values in a non filtered way
        if (chartBase.saveUnfilteredData) {
            this.unfilteredObjectStore = [];
            var initialData = this.chartBase.crossfilterGrouping.group.top(Infinity).reverse();
            if (this.orderFunc && this.orderFunc.func) {
                initialData = this.orderFunc.func(initialData);
                this.currentOrderFunc = this.orderFunc;
            }
            this.unfilteredObjectStore = initialData.map((d) => {
                var ret = {
                    key: d.key,
                    value: { value: [], weightTotal: [], order: d.value.order }
                };
                // making a deep copy beacuse we dont want to reference the original because it will get filtered....
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: IMetric<T>) => {
                    if ("undefined" !== typeof d.value.value[metric.id]) {
                        ret.value.value[metric.id] = d.value.value[metric.id];
                    }
                    if ("undefined" !== typeof d.value.weightTotal[metric.id]) {
                        ret.value.weightTotal[metric.id] = d.value.weightTotal[metric.id];
                    }
                });
                return ret;
            });
        }

        // override these to alter data formation
        this.mapPointData = (point: Util.ILabelKeyValueTuple) => { return point; };
        this.filterPointData = (points: Array<Util.ILabelKeyValueTuple>) => { return points; };
        this.mapSeriesData = (series: INvd3Data, metric: IMetric<T>, seriesId: number) => { return series; };
        this.filterSeriesData = (series: Array<IExtendedNvd3Data>) => { return series; };

        if (chartBase.metricToggleGroups && chartBase.metricToggleGroups.length > 1) {
            if (chartBase.metricToggleGroups && chartBase.metricToggleGroups.length) {
                this.metricToggleGroups = chartBase.metricToggleGroups;

                if (chartBase.selectedMetricGroupIndex && chartBase.selectedMetricGroupIndex < chartBase.metricToggleGroups.length) {
                    // use specified group index if valid
                    this.selectedMetricGroupIndex = chartBase.selectedMetricGroupIndex;
                } else {
                    // default to first group
                    this.selectedMetricGroupIndex = 0;
                }
                this.metricsSelected = this.metricToggleGroups[this.selectedMetricGroupIndex].ids;
            } else {
                console.log("Error: to enable metric toggle feature, metric groups of 2 or more must be specified");
            }
        }


        // add a series per metric, pivot to secondary grouping if present
        this.addSeries = (
            seriesList: Array<INvd3Data>,
            dataArray: Array<CrossFilter.Grouping<any, any>>,
            groupSecondary: CrossFilter.Grouping<any, any> = null) => {
            var treatZerosAsNulls: boolean = (null != chartBase.treatZerosAsNulls) ? chartBase.treatZerosAsNulls : true;
            var foundSome = false; // we only want to add a series, if some data was found
            let metricsToDisplay: Array<IMetric<T>>;
            if (this.metricsSelected && this.metricsSelected.length) {
                metricsToDisplay = this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => {
                    return this.metricsSelected.indexOf(m.id) > -1;
                });
            } else {
                metricsToDisplay = this.chartBase.crossfilterGrouping.metrics;
            }
            metricsToDisplay.forEach((metric: IMetric<T>, seriesId: number) => {
                var isCumulative: boolean = (null != chartBase.displayMetricAsCumulativeSeries) ? chartBase.displayMetricAsCumulativeSeries(metric, seriesId) : false;
                var clipData: IClipData = (null != chartBase.clipData) ? chartBase.clipData(metric, seriesId) : null;
                var isRunningAverage: boolean = (null != chartBase.displayMetricAsRunningAverageSeries) ?
                    chartBase.displayMetricAsRunningAverageSeries(metric, seriesId) : false;
                var isUnfiltered: boolean = chartBase.saveUnfilteredData &&
                    (null != chartBase.displayMetricUnfilteredSeries) ? chartBase.displayMetricUnfilteredSeries(metric, seriesId) : false;
                // if we are cumulative, we add up all previous values
                var cumulativeValue: number = 0;
                var cumulativeWeight: number = 0;
                // get values
                var dataToUse = dataArray;
                if (isUnfiltered) {
                    // if we are using an unfilterd set for this metric, get from the unfiltered store
                    dataToUse = this.unfilteredObjectStore;
                }
                var values: Array<Util.ILabelKeyValueTuple> = [];
                for (var dIndex = 0; dIndex < dataToUse.length; dIndex++) {
                    var d: any = dataToUse[dIndex];
                    // only add the dataitem if it is not beyond a max x
                    if ((null === clipData) || d.key <= clipData.max) {
                        var v = 0;
                        var valueFuncData = d; // assume we are using the top level
                        if (Util.isDefinedAndNotNull(groupSecondary)) { // but grab the secondary grouping level if requested
                            // metric.valueFunc assumes a key value pair
                            valueFuncData = { label: d.key, key: d.key, value: d.value.secondaryGrouping[groupSecondary.key] };
                        }
                        v = metric.valueFunc(valueFuncData);
                        foundSome = foundSome || v !== 0;
                        // if this series is Cumulative, return a running sum
                        if (isCumulative || isRunningAverage) {
                            // track values so far
                            cumulativeValue += valueFuncData.value.value[metric.id];
                            cumulativeWeight += valueFuncData.value.weightTotal[metric.id];
                            // replace with tracked values
                            let newValueFuncData = { label: d.key, key: d.key, value: { value: {}, weightTotal: {} } };
                            newValueFuncData.value.value[metric.id] = cumulativeValue;
                            newValueFuncData.value.weightTotal[metric.id] = cumulativeWeight;
                            v = metric.valueFunc(newValueFuncData);

                            // divide by the bucket num if running average
                            if (isRunningAverage) {
                                v /= (1 + dIndex);
                            }
                        }
                        values.push(<Util.ILabelKeyValueTuple>this.mapPointData(
                            {
                                label: d.key, // save key in label, because nvd3 trumps key
                                key: d.key,
                                value: !treatZerosAsNulls ? v : ((v === 0) ? null : v) // force 0's to null in default case
                            })
                        );
                    } else if ((null !== clipData) && clipData.displayZeros) {
                        values.push(<Util.ILabelKeyValueTuple>this.mapPointData(
                            {
                                label: d.key, // save key in label, because nvd3 trumps key
                                key: d.key,
                                value: null
                            })
                        );
                    }
                }
                if (!treatZerosAsNulls || foundSome) {
                    // add the series to the series list
                    var seriesName = metric.title + ((isUnfiltered && chartBase.unfilteredTitleAppend) ? chartBase.unfilteredTitleAppend : "");
                    if (Util.isDefinedAndNotNull(groupSecondary)) {
                        // a more complicated key name for sub grouped series
                        // TODO: make the format configurable
                        seriesName = this.chartBase.crossfilterGrouping.keySecondary.shortFormatFunc(groupSecondary.key) +
                            (this.chartBase.crossfilterGrouping.metrics.length > 1 ? (": " + metric.title) : "");
                    }
                    // allow subclasses to filter
                    values = this.filterPointData(values);
                    seriesList.push(this.mapSeriesData(
                        {
                            key: seriesName,
                            values: values
                        },
                        metric,
                        seriesId));
                }
            });
        };

        this.dataMapFunc = () => {
            let nvd3ChartBase: IAbstractNvd3ChartBase<T> = <IAbstractNvd3ChartBase<T>>this.chartBase;
            let ret = <Array<IExtendedNvd3Data>>[];
            // nvd3 expects the data in a specific way, map the crossfilter data to what the chart expects
            // this will likely need to be done differently for some charts, so we need an override method

            // resort the unfiltered set if we have one
            if (nvd3ChartBase.saveUnfilteredData) {
                if (this.orderFunc && this.orderFunc.func && this.currentOrderFunc !== this.orderFunc) {
                    this.unfilteredObjectStore = this.orderFunc.func(this.unfilteredObjectStore);
                }
            }
            // for each metric/secondaryGrouping, grab the values from the group
            let dataArray = nvd3ChartBase.crossfilterGrouping.group.top(Infinity).reverse();
            if (this.orderFunc && this.orderFunc.func) {
                dataArray = this.orderFunc.func(dataArray); // does not work in multi case....
                this.currentOrderFunc = this.orderFunc;
            }

            // add series
            if (Util.isDefinedAndNotNull(nvd3ChartBase.crossfilterGrouping.groupsSecondary)) {
                nvd3ChartBase.crossfilterGrouping.groupsSecondary.forEach((groupSecondary: CrossFilter.Grouping<any, any>) => {
                    this.addSeries(ret, dataArray, groupSecondary);
                });
            } else {
                // else just add the 1 series per metric
                this.addSeries(ret, dataArray);
            }
            // allow subclasses to filter
            ret = this.filterSeriesData(ret);

            // run last pass data manipulation passed from caller
            if (Util.isDefinedAndNotNull(this.manipulateFinalDataFunc)) {
                ret = this.manipulateFinalDataFunc(ret);
            }
            return ret;
        };

        this.setSelectedMetric = (groupId: string) => {
            if (this.metricToggleGroups[groupId]) {
                this.metricsSelected = this.metricToggleGroups[groupId].ids;
                this.selectedMetricGroupIndex = parseInt(groupId, 10);
                this.reMapData();
            } else {
                console.log("error: metric group not found.");
            }
        };

        this.maxTooltipKeyLen = chartBase.maxTooltipKeyLen;

        // These are identical to the defaults in angular-nvd3.  Changing these
        // to false should provide a significant performance boost, but may cause
        // side-effects.
        this.ngNvd3Config = {
            deepWatchOptions: true,
            deepWatchData: true
        };
    }

    // init sets up the nvd3 data
    public init(initExtension: (c: any) => void) {
        var nvd3ChartBase = <IAbstractNvd3ChartBase<T>>this.chartBase;
        var ct: any = {
            type: this.chartType,
            chartType: this.chartType, // temporarily added to fix tscompile error
            height: this.height,
            width: this.width,
            margin: this.margin,
            legend: {},
            // key and value are defined in the dataset via map
            // for any data where label value is not numerical, index value is used instead
            x: d => typeof d.label === "string" ? d.index : d.label,
            y: d => d.value,
            transitionDuration: 500, // defalted for now
            xAxis: <IAxis>{
                axisLabel: this.hideXAxisLabel ? "" : this.chartBase.crossfilterGrouping.key.title,
                tickFormat: (d: any) => {
                    // for any data where value of index is used as x-value instead of value of label
                    // string/display name should be retrieved by index lookup
                    return Util.isDefinedAndNotNull(this.chartBase.crossfilterGrouping.key.groupNameLookup)
                    ? this.chartBase.crossfilterGrouping.key.groupNameLookup(d, this.chartBase.crossfilterGrouping.group.top(999).reverse())
                    : this.chartBase.crossfilterGrouping.key.shortFormatFunc(d); },
                axisLabelDistance: 20
            },
            yAxis: <IAxis>{
                axisLabel: this.chartBase.crossfilterGrouping.metrics[0].title,
                tickFormat: (d: any) => {
                    // do not display "0" as a tick label if specified
                    return (d === 0 && nvd3ChartBase.hideZeroTicks) ? "" : this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc(d);
                },
                axisLabelDistance: 20 // defaulted for now
            },
            showLegend: !nvd3ChartBase.hideLegend,
            color: this.colors && $.proxy(function (d, i) {
                return this.colors[((typeof this.colorAccessor !== "undefined") ?
                    this.colorAccessor(d, i) : i) % this.colors.length];
            }, this),
            lines: {
                // force line charts to start yaxis on zero... we can config this, but this should be the default
                forceY: [0]
            },
            tooltip:
            {
                enabled: !nvd3ChartBase.hideTooltips
            }
        };
        if (!nvd3ChartBase.floatLegend) {
            ct.legend.align = false;
        }
        if (Util.isDefinedAndNotNull(nvd3ChartBase.legendMargin)) {
            ct.legend.margin = nvd3ChartBase.legendMargin;
        }

        // build options
        this.nvd3Options = <INvd3Options><{}>{
            // set up chart
            chart: ct,
            caption: <ICaption>{
                enable: nvd3ChartBase.caption && nvd3ChartBase.caption !== "",
                text: nvd3ChartBase.caption
            }

            // there are other values we could set...
        };

        // build data from group
        this.reMapData();

        // update data if crossfilter filtered event
        this.eventManager.subscribe("filtered", this.reMapData);

        // add chart specific extensions
        initExtension(this.nvd3Options);
    }
}
