// module InteractiveCharts.ChartManager.ScalarChart {
    "use strict";

    import * as Util from "../../shared/util";
    import {
        forEach as lodash_forEach,
        reduce as lodash_reduce
    } from "lodash";

    import {
        AbstractChartViewModelBase,
        IAbstractChartBase,
        IAbstractChartViewModelBase,
        IModelState
    } from "../abstract-chart-view-model-base";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";
    import {
        IChartManager
    } from "../chart-manager";

    export enum MetricType {
        sum,
        weightedAverage,
        division
    }

    // data for scalarCharts
    export interface IScalarChartData {
        // used as header for boxes with one item
        key?: string;
        value: number;
        shortValue: string;
        longValue: string;
        // unit or differentiator for the items in one box
        unit?: string;
        groupId?: string;
        styles?: IScalarDataStyle;
        hide?: boolean;
    }

    export interface IScalarChartDataGroup {
        // type of objects in the group
        groupKey: string;
        // group title override... use instead of groupKey if passed in
        groupTitle?: string;
        // group header tooltip
        headerTooltip?: string;
        // list of metric ids in the group
        ids?: Array<string>;
        values?: Array<IScalarChartData>;
        units?: Array<string>;
        items?: Array<ICompositeDataUnit>;
        hide?: boolean;
        hasChangeIndicator?: boolean;
    }

    export interface IScalarDataStyle {
        key?: string;
        value?: string;
        unit?: string;
        isChangeIndicator?: boolean;
    }

    export interface ICompositeDataUnit {
        /* Following Can be used even for simple scalar metrics */
        ids: Array<string>;
        styles?: IScalarDataStyle;
        /* All attributes below this is used for aggregation of parent value based on child metric ids */
        aggregateFunc?: (args: Array<number>) => number;
        parentId?: string; // Would be a fake id if there is a func which indicates current value is dependent
        // on evaluation of child ids which are in the ids collection
        posIndex?: number; // Position in the group to insert value
        shortFormatFunc?: (d: any) => string;
        longFormatFunc?: (d: any) => string;
        unit?: string;
        unitFunc?: (d?: IScalarChartData) => string;
        hidden?: boolean;
        changeIndicator?: boolean;
    }

    // chart def interface for all scalar charts (contains data on how to build the chartViewModel)
    export interface IAbstractScalarChartBase<T> extends IAbstractChartBase<T> {
        getMetricType?: (d: any) => MetricType;

        // optional grouping of metrics
        metricGroups?: Array<IScalarChartDataGroup>;

        // don't display metrics that are not part of a group, default to show
        hideUngroupedMetrics?: boolean;
    }


    // base view model class for scalar charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export interface IAbstractScalarChartViewModelBase<T> extends IAbstractChartViewModelBase<T> {
        init: (initExtension: (c: any) => void) => void;

        // scalar specific values
        scalarChartData: Array<IScalarChartData>;

        // specified grouping of metrics and data
        metricGroups?: Array<IScalarChartDataGroup>;
    }


    // base view model class for all scalar charts
    // none of the properties should be altered (readonly is not supported by typescript yet)
    export class AbstractScalarChartViewModelBase<T> extends AbstractChartViewModelBase<T> implements IAbstractScalarChartViewModelBase<T> {
        public scalarChartData: Array<IScalarChartData>;
        public metricGroups: Array<IScalarChartDataGroup>;
        public dataMapFunc: (getMetricType: (d: any) => MetricType) => Array<IScalarChartData> = null;
        protected scalarChartBase: IAbstractScalarChartBase<T>;

        constructor(chartBase: IAbstractScalarChartBase<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);
            this.scalarChartBase = chartBase;

            this.dataMapFunc = (getMetricType: (d: any) => MetricType) => {
                var ret = <Array<IScalarChartData>>[];
                this.chartBase.crossfilterGrouping.metrics.forEach((metric: IMetric<T>) => {
                    // for each metric, grab the values from the group
                    var value: number = 0;
                    let metricType = getMetricType ? getMetricType(metric.title) : MetricType.sum;
                    if (metricType === MetricType.weightedAverage) {
                        var valNu: number = <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceSum(function (d: T) {
                            return metric.reduceFunc(d) * metric.reduceWeightFunc((d));
                        }).value();
                        var valDe: number = <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceSum(function (d: T) {
                            return metric.reduceWeightFunc((d));
                        }).value();
                        value = valNu / valDe;
                    } else if (metricType === MetricType.division) {
                        var valNu: number = <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceSum(function (d: T) {
                            return metric.reduceFunc(d);
                        }).value();
                        var valDe: number = <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceSum(function (d: T) {
                            return metric.reduceWeightFunc((d));
                        }).value();
                        value = valNu / valDe;
                    } else /* metricType === MetricType.sum */ {
                        let count: number = <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceCount().value();
                        value = count > 0 ? <number><any>this.chartBase.crossfilterGrouping.dimension.groupAll().reduceSum(function (d: T) {
                            return metric.reduceFunc(d);
                        }).value() : NaN;
                    }
                    ret.push(
                        {
                            key: metric.title,
                            value: value,
                            longValue: metric.longFormatFunc(value),
                            shortValue: metric.shortFormatFunc(value)
                        });
                });
                return ret;
            };
        }

        // init sets up the scalar data
        public init() {
            this.scalarChartData = this.dataMapFunc(this.scalarChartBase.getMetricType);

            // update data if crossfilter filtered event
            this.eventManager.subscribe("filtered", $.proxy(() => { this.scalarChartData = this.dataMapFunc(this.scalarChartBase.getMetricType); }, this));
        }

        public updateState(chartLevelModelState: IModelState): boolean {
            this.chartBase.hideChart = !chartLevelModelState.isVisible; // Show/hide the KPI chart group
            if (this.chartBase.hideChart) {
                console.log("Hiding entire chart with id:" + this.chartBase.crossfilterGrouping.keyId + " and title:" + this.chartBase.title);
            }
            if (Util.isEmpty(this.scalarChartBase.metricGroups)) {
                this.updateMetrics(chartLevelModelState);
            } else {
                this.updateMetricGroups(chartLevelModelState);
            }
            return true;
        }

		/**
		 *  a) Change order of scalarChart data based on index off matching modelState.name property
		 *  b) Set visibility to true / false based on matching modelState.isSelected Property
		 *
		 *  To get the IScalarChartData corresponding to the childModelState, we have to
		 *  a) First get the metric corresponding to that child state (as the MetricId is passed in from client)
		 *  b) Get the Scalar chart corresponding to the looked up Metric's title
		 */
        private updateMetrics(chartModelState: IModelState): void {
            if (!Util.isEmpty(chartModelState.modelStates)) {
                let metricLookup: { [key: string]: IMetric<T>; } =
                    lodash_reduce(this.chartBase.crossfilterGrouping.metrics,
                        (metricAccumulator: { [key: string]: IMetric<T>; },
                            iMetric: IMetric<T>) => {
                            metricAccumulator[iMetric.id] = iMetric;
                            return metricAccumulator;
                        }, <{ [key: string]: IMetric<T>; }>{});

                let scalarChartLookup: { [key: string]: IScalarChartData; } =
                    lodash_reduce(this.scalarChartData, (scAcccumulator: { [key: string]: IScalarChartData; }, scalarChartData: IScalarChartData) => {
                        scAcccumulator[scalarChartData.key] = scalarChartData;
                        return scAcccumulator;
                    }, <{ [key: string]: IScalarChartData; }>{});

                let hiddenCount: number = 0;
                let missedKpi: number = 0;
                this.scalarChartData.splice(0, this.scalarChartData.length);
                lodash_forEach(chartModelState.modelStates, (metricModelState: IModelState) => {
                    if (Util.isEmpty(metricModelState.ids)) {
                        return;
                    }
                    let metric: IMetric<T> = lodash_reduce(metricModelState.ids, (result: IMetric<T>, id: string) => {
                        return result || metricLookup[id];
                    }, undefined);
                    if (!Util.isDefinedAndNotNull(metric)) {
                        return;
                    }
                    if (Util.isDefinedAndNotNull(scalarChartLookup[metric.title])) {
                        let sd: IScalarChartData = scalarChartLookup[metric.title];
                        sd.hide = !metricModelState.isVisible;
                        if (sd.hide) {
                            hiddenCount++;
                        }
                        this.scalarChartData.push(sd);
                    } else {
                        missedKpi++;
                    }
                });
                if (hiddenCount > 0) {
                    console.log("Hiding " + hiddenCount.toString(10) + " KPIs in chart with id:" + this.chartBase.crossfilterGrouping.keyId + " and title:" + this.chartBase.title);
                }
                if (missedKpi > 0) {
                    console.log("Unable to find match for " + missedKpi.toString(10) +
                        " KPIs to update in chart with id:" + this.chartBase.crossfilterGrouping.keyId + " and title:" + this.chartBase.title);
                }
            }
        }

		/**
		 * Similar to updateMetric except now we have an extra layer of nesting (ScalarDataGroup) for lookup of Metrics
		 */
        private updateMetricGroups(chartModelState: IModelState): void {
            let hiddenCount: number = 0;
            let missedKpi: number = 0;
            if (!Util.isEmpty(chartModelState.modelStates)) {
                let metricLookup: { [key: string]: IMetric<T>; } = {};
                let scalarDataGroupLookup: { [key: string]: IScalarChartDataGroup; } =
                    lodash_reduce(this.scalarChartBase.metricGroups, (sdgAccumulator: { [key: string]: IScalarChartDataGroup; }, sdg: IScalarChartDataGroup) => {
                        sdgAccumulator[sdg.groupKey] = sdg;
                        metricLookup = this.getMetricsForScalarDataGroup(sdg, metricLookup);
                        return sdgAccumulator;
                    }, <{ [key: string]: IScalarChartDataGroup; }>{});

                let scalarChartLookup: { [key: string]: IScalarChartData; } =
                    lodash_reduce(this.scalarChartData, (scAcccumulator: { [key: string]: IScalarChartData; }, scalarChartData: IScalarChartData) => {
                        scAcccumulator[scalarChartData.key] = scalarChartData;
                        return scAcccumulator;
                    }, <{ [key: string]: IScalarChartData; }>{});
                let showOrHideMetricsForEachScalarDataGroup = function (groupModelState: IModelState) {
                    if (Util.isEmpty(groupModelState.ids)) {
                        return;
                    }
                    let sdg: IScalarChartDataGroup = lodash_reduce(groupModelState.ids, (result: IScalarChartDataGroup, id: string) => {
                        return result || scalarDataGroupLookup[id];
                    }, undefined);
                    if (!Util.isDefinedAndNotNull(sdg)) {
                        return;
                    }
                    // set visibility
                    if (Util.isDefinedAndNotNull(groupModelState.isVisible)) {
                        sdg.hide = !groupModelState.isVisible;
                    }
                    // update title if need be
                    if (Util.isDefinedAndNotNull(groupModelState.groupTitle)) {
                        sdg.groupTitle = groupModelState.groupTitle;
                    }
                    // update tooltip if need be
                    if (Util.isDefinedAndNotNull(groupModelState.headerTooltip)) {
                        sdg.headerTooltip = groupModelState.headerTooltip;
                    }
                    this.metricGroups.push(sdg);
                    this.clearScalarDataGroupMetrics(sdg);
                    lodash_forEach(groupModelState.modelStates, (metricModelState: IModelState) => {
                        if (Util.isEmpty(metricModelState.ids)) {
                            return;
                        }
                        let metric: IMetric<T> = lodash_reduce(metricModelState.ids, (result: IMetric<T>, id: string) => {
                            return result || metricLookup[id];
                        }, undefined);
                        if (!Util.isDefinedAndNotNull(metric)) {
                            missedKpi++;
                            return;
                        }
                        if (Util.isDefinedAndNotNull(scalarChartLookup[metric.title])) {
                            let sd: IScalarChartData = scalarChartLookup[metric.title];
                            sd.hide = !metricModelState.isVisible || sdg.hide;
                            if (sd.hide) {
                                hiddenCount++;
                            }
                            this.scalarChartData.push(sd);
                            this.addMetricToScalarDataGroup(sdg, metric);
                        } else {
                            missedKpi++;
                        }
                    });
                };

                this.metricGroups.splice(0, this.metricGroups.length);
                this.scalarChartData.splice(0, this.scalarChartData.length);
                lodash_forEach(chartModelState.modelStates, (groupModelState: IModelState) => {
                    showOrHideMetricsForEachScalarDataGroup.call(this, groupModelState);
                });
                if (hiddenCount > 0) {
                    console.log("Hiding " + hiddenCount.toString(10) + " KPIs in chart with id:" + this.chartBase.crossfilterGrouping.keyId + " and title:" + this.chartBase.title);
                }
                if (missedKpi > 0) {
                    console.log("Unable to find match for " + missedKpi.toString(10) +
                        " KPIs to update in chart with id:" + this.chartBase.crossfilterGrouping.keyId + " and title:" + this.chartBase.title);
                }
            }
        }

        protected getMetricsForScalarDataGroup(
            sdg: IScalarChartDataGroup, metricLookup: { [key: string]: IMetric<T>; }): { [key: string]: IMetric<T>; } {
            return lodash_reduce(sdg.ids, (metricAccumulator: { [key: string]: IMetric<T>; }, metricId: string) => {
                var met: IMetric<T> = this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => { return m.id === metricId; })[0];
                metricAccumulator[met.id] = met;
                return metricAccumulator;
            }, metricLookup);
        }

        protected clearScalarDataGroupMetrics(sdg: IScalarChartDataGroup): void {
            sdg.ids.splice(0, sdg.ids.length);
        }

        protected addMetricToScalarDataGroup(sdg: IScalarChartDataGroup, metric: IMetric<T>): void {
            sdg.ids.push(metric.id);
        }
    }
// }