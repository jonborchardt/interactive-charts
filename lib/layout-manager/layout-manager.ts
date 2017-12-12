// module InteractiveCharts.LayoutManager {
    "use strict";

    // import ChartManager = InteractiveCharts.ChartManager;
    import * as Util from "../shared/util";
    import {
        IAbstractChartBase
    } from "../chart-manager/abstract-chart-view-model-base";

    // defines a set of chart rows for use by angulars repeat
    // groups have rows, rows have columns, columns have charts
    export interface IChartGroup<T> {
        chartRows: Array<IChartRow<T>>;
    }

    // defines a set of chart columns for use by angulars repeat
    // groups have rows, rows have columns, columns have charts
    export interface IChartRow<T> {
        chartColumns: Array<IChartColumn<T>>;
    }


    // defines a set of charts for use by angulars repeat
    // groups have rows, rows have columns, columns have charts
    export interface IChartColumn<T> {
        charts: Array<IAbstractChartBase<T>>;
    }


    export interface IChartRowManager<T> {
        getChartGroup: (chartGroupid?: any) => IChartGroup<T>;
        addChart: (chart: IAbstractChartBase<T>, row: number, column: number, chartGroupId?: any) => void;
    }


    // manage chart rows
    export class ChartRowManager<T> implements IChartRowManager<T> {
        private defaultchartGroupId = "_defaultchartGroupId123";
        private chartGroups: Array<IChartGroup<T>> = [];

        public getChartGroup = (chartGroupId?: any) => {
            if (!Util.isDefinedAndNotNull(chartGroupId)) {
                chartGroupId = this.defaultchartGroupId;
            }
            var chartGroupIdString: string = chartGroupId.toString();
            return this.chartGroups[chartGroupIdString];
        };

        public addChart = (chart: IAbstractChartBase<T>, row: number, column: number, chartGroupId?: any) => {
            if (!Util.isDefinedAndNotNull(chartGroupId)) {
                chartGroupId = this.defaultchartGroupId;
            }
            var chartGroupIdString: string = chartGroupId.toString();

            if (!this.chartGroups[chartGroupIdString]) {
                this.chartGroups[chartGroupIdString] = <IChartGroup<T>>{ chartRows: <Array<IChartRow<T>>>[] };
            }

            if (!this.chartGroups[chartGroupIdString].chartRows[row]) {
                this.chartGroups[chartGroupIdString].chartRows[row] = <IChartRow<T>>{ chartColumns: <Array<IChartColumn<T>>>[] };
            }

            if (!this.chartGroups[chartGroupIdString].chartRows[row].chartColumns[column]) {
                this.chartGroups[chartGroupIdString].chartRows[row].chartColumns[column] = { charts: <Array<IAbstractChartBase<T>>>[] };
            }

            this.chartGroups[chartGroupIdString].chartRows[row].chartColumns[column].charts.push(chart);
        };
    }
// }
