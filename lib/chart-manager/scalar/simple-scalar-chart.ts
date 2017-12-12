// SimpleScalarChart
// an chart showing a number and title
// module InteractiveCharts.ChartManager.ScalarChart {
    "use strict";

    import "./scalar-chart.less";

    import * as Util from "../../shared/util";

    import {
        AbstractScalarChartViewModelBase,
        IAbstractScalarChartBase,
        IAbstractScalarChartViewModelBase,
        IScalarChartData,
        IScalarChartDataGroup
    } from "./abstract-scalar-chart-view-model-base";

    import {
        IMetric
    } from "../../crossfilter-manager/key-metric-manager";
    import {
        IChartManager
    } from "../chart-manager";

    // import CrossfilterManager = InteractiveCharts.CrossfilterManager; // todo: seems wrong

    // chart def interface (contains data on how to build the chartViewModel)
    export interface ISimpleScalarChartBase<T> extends IAbstractScalarChartBase<T> {
        // add any additional options as we support them


    }

    // view model interface (the built chart)
    export interface ISimpleScalarChartViewModelBase<T> extends IAbstractScalarChartViewModelBase<T> {
        // add any additional options as we support them


    }

    // view model class (use init to add most chart specific scalar options)
    export class SimpleScalarChartViewModel<T> extends AbstractScalarChartViewModelBase<T> implements ISimpleScalarChartViewModelBase<T> {
        constructor(chartBase: IAbstractScalarChartBase<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);
            this.chartType = "simpleScalarChart";
            super.init();

            this.scalarChartBase.metricGroups = this.scalarChartBase.metricGroups || [];
            if (this.scalarChartBase.metricGroups) {
                this.addGroupingInfo();
                // update grouping data when filter event detected
                this.eventManager.subscribe("filtered", $.proxy(() => {
                    this.addGroupingInfo();
                }, this));
            }
        }

        public addGroupingInfo = () => {
            this.scalarChartBase.metricGroups.forEach((group: IScalarChartDataGroup) => {
                group.ids.forEach((metricId: string, index: number) => {
                    let met: IMetric<T> = this.chartBase.crossfilterGrouping.metrics.filter((m: IMetric<T>) => {
                         return m.id === metricId;
                    })[0];
                    if (!Util.isDefinedAndNotNull(met)) {
                        console.log("Failed to locate matching metric.");
                    } else {
                        this.scalarChartData.map((d: IScalarChartData) => {
                            let unitStr: string;
                            if (Util.isDefinedAndNotNull(group.units) && Util.isDefinedAndNotNull(group.units[index])) {
                                unitStr = group.units[index];
                            } else {
                                unitStr = Util.isDefinedAndNotNull(d.unit) ? d.unit : d.key.split(" ").pop().toUpperCase();
                            }
                            if (d.key.toLowerCase() === met.title.toLowerCase()) {
                                d.groupId = group.groupKey;
                                d.unit = unitStr;
                            }
                        });
                    }
                });
            });
            this.metricGroups = this.scalarChartBase.metricGroups;
        };
    }
// }
