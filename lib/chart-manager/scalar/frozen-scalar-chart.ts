// SimpleScalarChart
// an chart showing a number and title that does not change with the filters
// module InteractiveCharts.ChartManager.ScalarChart {
    "use strict";

    import {
        AbstractScalarChartViewModelBase,
        IAbstractScalarChartBase,
        IAbstractScalarChartViewModelBase,
        IScalarChartData,
        IScalarChartDataGroup,
        MetricType
    } from "./abstract-scalar-chart-view-model-base";

    import {
        IChartManager
    } from "../chart-manager";

    // chart def interface (contains data on how to build the chartViewModel)
    export interface IFrozenScalarChartBase<T> extends IAbstractScalarChartBase<T> {
        frozenData: Array<IScalarChartData>;
        // add any additional options as we support them
    }

    // view model interface (the built chart)
    export interface IFrozenScalarChartViewModelBase<T> extends IAbstractScalarChartViewModelBase<T> {
        frozenData: Array<IScalarChartData>;
        // add any additional options as we support them
    }


    // view model class (use init to add most chart specific scalar options)
    export class FrozenScalarChartViewModel<T> extends AbstractScalarChartViewModelBase<T> implements IFrozenScalarChartViewModelBase<T> {
        public frozenData: Array<IScalarChartData>;

        constructor(chartBase: IAbstractScalarChartBase<T>, chartManager: IChartManager<T>) {
            super(chartBase, chartManager);

            this.chartBase = chartBase;

            this.chartType = "frozenScalarChart";

            this.frozenData = (<IFrozenScalarChartBase<T>>this.chartBase).frozenData;

            // ovverride datamap
            this.dataMapFunc = (getMetricType: (d: any) => MetricType) => {
                var ret = <Array<IScalarChartData>>[];
                this.frozenData.forEach((d: IScalarChartData) => {
                    ret.push(
                        {
                            key: d.key || "",
                            value: d.value,
                            longValue: d.longValue,
                            shortValue: d.shortValue
                        });
                });
                return ret;
            };

            super.init();
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
                // array to store values for the group
                group.values = [];

                // iterate through keys in a group
                group.ids.forEach((key: string, index: number) => {
                    // identify elements to be moved to the grouped list
                    var elem: IScalarChartData = this.scalarChartData.filter((d: IScalarChartData) => { return d.key === key; })[0];
                    var scalarValue = <IScalarChartData>{
                        value: elem.value,
                        longValue: elem.longValue,
                        shortValue: elem.shortValue,
                        unit: (group.units && group.units[index]) ? group.units[index] : ""
                    };
                    group.values.push(scalarValue);

                    // metricsGroup[1,2,..n] (as n separate boxes) plus
                    // scalarChartData[1,2,..n] (as n separate boxes) will be rendered
                    // remove items that are included in the group from the original list
                    this.scalarChartData.splice(this.scalarChartData.indexOf(elem), 1);
                });
            });

            this.metricGroups = this.scalarChartBase.metricGroups;
        };
    }
// }