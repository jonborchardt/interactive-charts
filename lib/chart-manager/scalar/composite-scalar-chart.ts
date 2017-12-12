// module InteractiveCharts.ChartManager.ScalarChart {
    "use strict";

    import "./scalar-chart.less";
    import { reduce as lodash_reduce } from "lodash";
    import { noop as ngNoop } from "angular";

    import * as Util from "../../shared/util";
    import {
        IModelState
    } from "../abstract-chart-view-model-base";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";

    import {
        AbstractScalarChartViewModelBase,
        IAbstractScalarChartBase,
        IAbstractScalarChartViewModelBase,
        ICompositeDataUnit,
        IScalarChartData,
        IScalarChartDataGroup,
        IScalarDataStyle
    } from "./abstract-scalar-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

    import * as KeyMetricManager from "../../crossfilter-manager/key-metric-manager"; // todo: seems wrong

    // chart def interface (contains data on how to build the chartViewModel)
    export interface ICompositeScalarChartBase<T> extends IAbstractScalarChartBase<T> {
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface ICompositeScalarChartViewModelBase<T> extends IAbstractScalarChartViewModelBase<T> {
        // add any additional options as we support them
    }

    // view model class (use init to add most chart specific scalar options)
    export class CompositeScalarChartViewModel<T> extends AbstractScalarChartViewModelBase<T> implements ICompositeScalarChartViewModelBase<T> {
        constructor(chartBase: IAbstractScalarChartBase<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);
            this.chartType = "compositeScalarChart";
            this.scalarChartBase.metricGroups = !Util.isEmpty(this.scalarChartBase.metricGroups)
                ? this.scalarChartBase.metricGroups : [];
            this.init();
        }

        private evaluateComposites = () => {
            if (Util.isEmpty(this.scalarChartBase.metricGroups)) {
                return;
            }
            this.scalarChartBase.metricGroups.forEach((group: IScalarChartDataGroup) => {
                // metricGroups[N]: card, metricGroups[N].items[N]: card.rowN
                if (Util.isEmpty(group.items)) {
                    console.log(`Metric groups should contain at least 1 item.`);
                    return;
                }
                group.hasChangeIndicator = false;
                group.items.forEach((item: ICompositeDataUnit, index: number) => {
                    if (item.aggregateFunc != null) {
                        let arr: Array<number> = [];
                        item.ids.forEach((id: string, idIndex: number) => {
                            let matchingMetrics: IMetric<T>[] =
                                this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => { return m.id === id; });
                            if (Util.isEmpty(matchingMetrics)) {
                                console.log(`Error: no matching metric found (id: ${id}).`);
                            } else {
                                let metric: IMetric<T> = matchingMetrics[0];
                                this.scalarChartData.forEach((sc: IScalarChartData, scIndex: number) => {
                                    if (sc.key === metric.title) {
                                        arr.push(sc.value);
                                    }
                                });
                            }
                        });

                        let matchingMetrics: IMetric<T>[] =
                            this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => { return m.id === item.ids[0]; });
                        let formatterFunc: any = !Util.isEmpty(matchingMetrics) ? matchingMetrics[0].longFormatFunc
                            : (value: number) => { return value.toString(); };
                        let result: number = item.aggregateFunc.call(this, arr);

                        if (!Util.isDefinedAndNotNull(item.posIndex)) {
                            item.posIndex = 0;
                        }
                        let diffFunc: (args: Array<number>) => number = (args: Array<number>): number => {
                            return args[0] - args[1];
                        };
                        let diffStr: string = formatterFunc(diffFunc(arr));
                        let unitStr: string = item.unitFunc ? item.unitFunc() : (item.unit ? item.unit : "%");

                        let scalarChartContent: IScalarChartData;
                        if (Util.isDefinedAndNotNull(item.changeIndicator) && item.changeIndicator) {
                            scalarChartContent = <IScalarChartData>{
                                shortValue: Util.isDefinedAndNotNull(item.shortFormatFunc) ? item.shortFormatFunc.call(this, result) : result.toString(),
                                longValue: diffStr + (Util.isCloseToZero(result) ? "" : " (" + result.toFixed(1) + unitStr + ")"),
                                value: result,
                                key: Util.isDefinedAndNotNull(item.parentId) ? item.parentId : ""
                            };
                            group.hasChangeIndicator = true;
                        } else {
                            scalarChartContent = <IScalarChartData>{
                                shortValue: Util.isDefinedAndNotNull(item.shortFormatFunc) ? item.shortFormatFunc.call(this, result) : result.toString(),
                                longValue: isNaN(result) ? "--" : result.toFixed(1) + unitStr,
                                value: result,
                                key: Util.isDefinedAndNotNull(item.parentId) ? item.parentId : ""
                            };
                        }
                        this.scalarChartData.splice(index, 0, scalarChartContent);
                    }
                });
            });
        };

        private fillChartData = (key: string, group: IScalarChartDataGroup, item: ICompositeDataUnit) => {
            this.scalarChartData.map((d: IScalarChartData) => {
                if (d.key.toLowerCase() === key.toLowerCase()) {
                    d.groupId = group.groupKey;
                    d.styles = item.styles || <IScalarDataStyle>{};
                    if (Util.isDefinedAndNotNull(item.unitFunc)) {
                        d.unit = item.unitFunc(d);
                    } else {
                        d.unit = item.unit ? item.unit : d.unit || d.key.split(" ").pop().toUpperCase();
                    }
                    d.styles.isChangeIndicator = Util.isDefinedAndNotNull(item.changeIndicator) ? item.changeIndicator : false;
                    d.hide = Util.isDefinedAndNotNull(item.hidden) ? item.hidden : false;
                }
            });
        };

        public addGroupingInfo = () => {
            this.scalarChartBase.metricGroups.forEach((group: IScalarChartDataGroup) => {
                group.items.forEach((item: ICompositeDataUnit, index: number) => {
                    item.ids.forEach((metricId: string, index: number) => {
                        let met: IMetric<T> = this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => {
                            return m.id === metricId;
                        })[0];
                        if (Util.isDefinedAndNotNull(met)) {
                            this.fillChartData(met.title, group, item);
                        } else {
                            console.log(`Failed to locate matching metric with id ${metricId}.`);
                        }
                    });
                    if (Util.isDefinedAndNotNull(item.parentId) && item.parentId !== null) {
                        this.fillChartData(item.parentId, group, item);
                    }
                });

            });
            this.metricGroups = this.scalarChartBase.metricGroups;
        };

        public init() {
            this.scalarChartData = this.dataMapFunc(this.scalarChartBase.getMetricType);
            this.evaluateComposites();
            this.addGroupingInfo();
            // update data if crossfilter filtered event
            this.eventManager.subscribe("filtered", $.proxy(() => {
                this.scalarChartData = this.dataMapFunc(this.scalarChartBase.getMetricType);
                this.evaluateComposites();
                this.addGroupingInfo();
            }, this));
        }

        public updateState(charetLevelModelState: IModelState): boolean {
            let ret: boolean = super.updateState(charetLevelModelState);
            this.init();
            return ret;
        }

        protected getMetricsForScalarDataGroup(
            group: IScalarChartDataGroup, metricLookup: { [key: string]: IMetric<T>; }): { [key: string]: IMetric<T>; } {
            group.items.forEach((item: ICompositeDataUnit, index: number) => {
                return lodash_reduce(item.ids, (metricAccumulator: { [key: string]: IMetric<T>; }, metricId: string) => {
                    var met: IMetric<T> =
                        this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => { return m.id === metricId; })[0];
                    if (Util.isDefinedAndNotNull(met)) {
                        metricAccumulator[met.id] = met;
                    }
                    return metricAccumulator;
                }, metricLookup);
            });

            return metricLookup;
        }

        /***
         * TODO : Need to figure out if we need to anything beyond show / hide for items inside ICompositeDataUnit.
         * If we don't have to, then we can show hide at the group and the individual ScalarData level.
         * For re-ordering, for the ICompositeDatUnit which has a parentId value, we might need to pass a new aggregateFunc
         * So TBD for now.  Currently doing a noop for both clear and addMetricToScalarDatGroup should have no impact as
         * re-ordering withing the group would not work.
         * @param group
         */
        protected clearScalarDataGroupMetrics(group: IScalarChartDataGroup): void {
            ngNoop();
        }

        protected addMetricToScalarDataGroup(group: IScalarChartDataGroup, metric: IMetric<T>): void {
            ngNoop();
        }
    }
// }

