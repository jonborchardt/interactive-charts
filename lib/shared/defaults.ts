// interfaces, static functions and variables to help make generic chart creation faster and more consistent
// module InteractiveCharts.Shared.Defaults {
    "use strict";

    import {
        ChartManager
    } from "../../lib/index";

    import {
        IAbstractChartBase,
        IAbstractChartViewModelBase,
        IModelState
    } from "../chart-manager/abstract-chart-view-model-base";

    import {
        FilterBarChartViewModel
    } from "../chart-manager/dc/filter-bar-chart";

    import {
        FilterLineChartViewModel
    } from "../chart-manager/dc/filter-line-chart";

    import {
        FilterPieChartViewModel
    } from "../chart-manager/dc/filter-pie-chart";

    import {
        FilterRowChartViewModel
    } from "../chart-manager/dc/filter-row-chart";

    import {
        OneFilterBarChartViewModel
    } from "../chart-manager/one/one-filter-bar-chart";

    export function registerDefaultCharts<T>(chartManager: ChartManager.IChartManager<T>): void {
        // register charts we will use
        chartManager.registerChart(
            ChartManager.ChartType.simpleScalarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.ScalarChart.SimpleScalarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.compositeScalarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.ScalarChart.CompositeScalarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.frozenScalarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.ScalarChart.FrozenScalarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.filterBarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new FilterBarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.filterRowChart + "",
            (chart: IAbstractChartBase<T>, manager:  ChartManager.ChartManager<T>) => {
                return new FilterRowChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.filterLineChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new FilterLineChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.filterPieChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new FilterPieChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.discreteBarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.DiscreteBarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.multiBarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.MultiBarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.stackedAreaChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.StackedAreaChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.pieChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.PieChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
                ChartManager.ChartType.rangeOnlyBoxPlotChart + "",
                (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                    return new ChartManager.Nvd3Chart.RangeOnlyBoxPlotChartViewModel<T>(chart, manager);
                });
        chartManager.registerChart(
            ChartManager.ChartType.lineChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.LineChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.sparklineChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.SparklineChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.multiChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.MultiChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.linePlusBarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new ChartManager.Nvd3Chart.LinePlusBarChartViewModel<T>(chart, manager);
            });
        chartManager.registerChart(
            ChartManager.ChartType.oneFilterBarChart + "",
            (chart: IAbstractChartBase<T>, manager: ChartManager.ChartManager<T>) => {
                return new OneFilterBarChartViewModel<T>(chart, manager);
            });
    }
// }
