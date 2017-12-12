// module InteractiveChartsExampleApp {
    "use strict";

    import {
        InteractiveCharts
     } from "../../index";

    import { copy as angular_copy } from "angular";
    import * as moment from "moment";
    import { time as d3_time } from "d3";

    import ChartManager = InteractiveCharts.ChartManager;
    import CrossfilterManager = InteractiveCharts.CrossfilterManager;
    import LayoutManager = InteractiveCharts.LayoutManager;
    import EventManager = InteractiveCharts.EventManager;
    import Util = InteractiveCharts.Util;
    import Defaults = InteractiveCharts.Defaults;

    import DcChart = InteractiveCharts.ChartManager.DcChart;
    import Nvd3Chart = InteractiveCharts.ChartManager.Nvd3Chart;
    import OneChart = InteractiveCharts.ChartManager.OneChart;
    import ScalarChart = InteractiveCharts.ChartManager.ScalarChart;

    export interface ITestTvAd {
        date: moment.Moment;
        market: string;
        daypart: string;
        network: string;
        spendPlanned: number;
        impressionsPlanned: number;
        cpmPlanned: number;
        spendActual: number;
        impressionsActual: number;
        cpmActual: number;
        id: number;
        revId: number;
    }

    export enum KeyName {
        CpmPlanned,
        Date,
        Day,
        Daypart,
        Id,
        Market,
        Month,
        MonthClone,
        Network,
        NetworkClone,
        Week,
        WeekClone
    }

    export enum MetricName {
        Count,
        ConstantGoal,
        CpmActual,
        CpmPlanned,
        CpmPercentageFake,
        CpmPercentageGroup,
        ImpressionsActual,
        ImpressionsPlanned,
        SpendActual,
        SpendPlanned,
        SpendPercentage,
        SpendPercentageFake,
        ZeroTest,
        BaselineCpmActual,
        BaselineCpmPlanned,
        BaselineSpendActual,
        BaselineSpendPlanned
    }

    export enum ChartName {
        CapNoFloat,
        CapNoFloatHideOthers,
        CpmPlannedFilter,
        CpmPlannedPerWeek,
        DayLineTest,
        DiscreteTest,
        DisplayMetricAsCumulativeSeriesTest,
        ZeroAsCumulativeSeriesTest,
        ExpectedImpressionsByDaypart,
        ImpsPerDayFilter,
        ImpressionsActualPerDaypart,
        ImpressionsPlannedPerDaypart,
        ImpressionsPlannedPerWeek,
        ImpressionsPlannedVsActualPerWeek,
        MultiBarHorizontalTest,
        MultiBarTest,
        MultiChartTest,
        MultiTicksExample,
        OrderingFloatRowHeght,
        Spark1,
        Spark2,
        Spark3,
        Spark4,
        Spark5,
        SpendPlannedPerWeek,
        StackedAreaTest1,
        StackedAreaTest2,
        FrozenSummaryScalar,
        FrozenSummaryScalarMulti,
        SummaryScalar,
        SummaryScalarMulti,
        CompositeScalar,
        CompositeScalarWithDiff,
        CompositeScalarWithDiff2,
        TopMarketsByImpressionsPlanned,
        TopNetworksByImpressionsPlanned,
        TimeSeries,
        YDomainExampleBase,
        YDomainExampleOffset,
        YDomainExampleScaled,
        OneFilterTest,
        OneFilterTest2
    }

    export enum ChartGroupName {
        Main,
        Accordion
    }

    export interface ITvReportCharts {
        chartManager: ChartManager.IChartManager<ITestTvAd>;
        crossfilterManager: CrossfilterManager.ICrossfilterManager<ITestTvAd>;
        chartRowManager: LayoutManager.IChartRowManager<ITestTvAd>;
        filterChartSummaryVm: ChartManager.DcChart.IFilterChartSummaryVm<ITestTvAd>;
    }

    export class TvReportCharts implements ITvReportCharts {
        public chartManager: ChartManager.IChartManager<ITestTvAd>;
        public crossfilterManager: CrossfilterManager.ICrossfilterManager<ITestTvAd>;
        public chartRowManager: LayoutManager.IChartRowManager<ITestTvAd>;
        public impressionsGoal: number = 4000000000;
        public filterChartSummaryVm: ChartManager.DcChart.FilterChartSummaryVm<ITestTvAd>;

        constructor(private rootScope: ng.IRootScopeService, ads: Array<ITestTvAd>, hiddenAds: Array<ITestTvAd>) {

            let keyMetricManager = new CrossfilterManager.KeyMetricManager<ITestTvAd>();
            // define keys (specific to the dataset, to be moved out of here and into data access when not in test data)
            // keys represent the domain / dimension of the data (how the data is grouped)
            keyMetricManager.addKey(
                KeyName.Id,
                "Id",
                (d: number) => { return "" + d; },
                (d: ITestTvAd) => { return d.id; },
                (d: number) => { return d; },
                CrossfilterManager.ValueType.Number
            );

            keyMetricManager.addKey(
                KeyName.Day,
                "Day",
                (d: string) => { return d.substr(d.indexOf(".") + 1, 30); },
                (d: ITestTvAd) => { return d.date.format("d.dddd"); },
                (d: string) => { return d; },
                CrossfilterManager.ValueType.String
            );

            keyMetricManager.addKey(
                KeyName.Date,
                "Date",
                (d: Date) => { return moment(d).format("MM/DD/YYYY"); },
                (d: ITestTvAd) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("day"); },
                CrossfilterManager.ValueType.DateTime
            );

            keyMetricManager.addKey(
                KeyName.Week,
                "Week",
                (d: Date) => { return moment(d).startOf("week").add(1, "day").format("MM/DD/YY"); },
                (d: ITestTvAd) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("week"); },
                CrossfilterManager.ValueType.DateTime
            );
            keyMetricManager.addKey(
                KeyName.WeekClone,
                "Week",
                (d: Date) => { return moment(d).startOf("week").add(1, "day").format("MM/DD/YY"); },
                (d: ITestTvAd) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("week"); },
                CrossfilterManager.ValueType.DateTime
            );

            keyMetricManager.addKey(
                KeyName.Month,
                "Month",
                (d: Date) => { return moment(d).format("MM/DD/YYYY"); },
                (d: ITestTvAd) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("month"); },
                CrossfilterManager.ValueType.DateTime
            );

            keyMetricManager.addKey(
                KeyName.MonthClone,
                "Month",
                (d: Date) => { return moment(d).format("MM/DD/YYYY"); },
                (d: ITestTvAd) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("month"); },
                CrossfilterManager.ValueType.DateTime
            );

            keyMetricManager.addKey(
                KeyName.Daypart,
                "Daypart",
                (d: string) => { return Util.getSuffix(d); },
                (d: ITestTvAd) => { return d.daypart; },
                (d: string) => { return Util.getSuffix(d); },
                CrossfilterManager.ValueType.String,
                null,
                null,
                (d: string) => { return Util.getSuffix(d) + " Long long long long long title in tooltip test"; }
            );

            keyMetricManager.addKey(
                KeyName.Network,
                "Network",
                (d: string) => { return d; },
                (d: ITestTvAd) => { return d.network; },
                (d: string) => { return d; },
                CrossfilterManager.ValueType.String
            );

            keyMetricManager.addCloneKey(
                KeyName.Network,
                KeyName.NetworkClone
            );

            keyMetricManager.addKey(
                KeyName.Market,
                "Market",
                (d: string) => { return d; },
                (d: ITestTvAd) => { return d.market; },
                (d: string) => { return d; },
                CrossfilterManager.ValueType.String
            );

            keyMetricManager.addKey(
                KeyName.CpmPlanned,
                "CPM Planned",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); },
                (d: ITestTvAd) => { return d.cpmPlanned; },
                (d: string) => { return d; },
                CrossfilterManager.ValueType.Number
            );

            // define metrics (specific to the dataset, to be moved out of here and into data access when not in test data)
            // metrics represent how we sum up or average the data inside a group or dimension
            keyMetricManager.addMetric(
                MetricName.Count,
                "Count",
                (d: number) => { return Util.commaShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.Count];
                },
                (d: ITestTvAd) => { return 1; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.CpmPlanned,
                "CPM Planned",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return (p.value.weightTotal[MetricName.CpmPlanned] ? p.value.value[MetricName.CpmPlanned] / p.value.weightTotal[MetricName.CpmPlanned] : 0);
                },
                (d: ITestTvAd) => { return d.spendPlanned * 1000; },
                (d: ITestTvAd) => { return d.impressionsPlanned; },
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); }
            );

            keyMetricManager.addMetric(
                MetricName.CpmActual,
                "CPM Actual",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return (p.value.weightTotal[MetricName.CpmActual] ? p.value.value[MetricName.CpmActual] / p.value.weightTotal[MetricName.CpmActual] : 0);
                },
                (d: ITestTvAd) => { return d.spendActual * 1000; },
                (d: ITestTvAd) => { return d.impressionsActual; },
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); }
            );

            keyMetricManager.addMetric(
                MetricName.ImpressionsPlanned,
                "Impressions Planned",
                (d: number) => { return Util.commaShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.ImpressionsPlanned];
                },
                (d: ITestTvAd) => { return d.impressionsPlanned; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.ImpressionsActual,
                "Impressions Actual",
                (d: number) => { return Util.commaShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.ImpressionsActual];
                },
                (d: ITestTvAd) => { return d.impressionsActual; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.SpendPercentage,
                "Spend %",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.SpendPercentage];
                },
                (d: ITestTvAd) => { return d.spendPlanned; },
                (d: ITestTvAd) => { return 1; },
                (d: any) => { return Util.commaFormatter[0](d % 100); }
            );

            keyMetricManager.addMetric(
                MetricName.SpendPlanned,
                "Spend Planned",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[0]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.SpendPlanned];
                },
                (d: ITestTvAd) => { return Util.isDefinedAndNotNull(d.revId) && d.revId === 1 ? d.spendPlanned : null; },
                (d: ITestTvAd) => { return Util.isDefinedAndNotNull(d.revId) && d.revId === 1 ? 1 : null; },
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[0], true); }
            );

            keyMetricManager.addMetric(
                MetricName.SpendActual,
                "Spend Actual",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.SpendActual];
                },
                (d: ITestTvAd) => { return Util.isDefinedAndNotNull(d.revId) && d.revId === 0 ? d.spendActual : null; },
                (d: ITestTvAd) => { return Util.isDefinedAndNotNull(d.revId) && d.revId === 0 ? 1 : null; },
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[0], true); }
            );

            keyMetricManager.addMetric(
                MetricName.ConstantGoal,
                "Goal",
                (d: number) => { return Util.commaShiftingFormatter(d, Util.commaFormatter[0]); },
                $.proxy((p: Util.ILabelKeyValueTuple) => { return this.impressionsGoal; }, this),
                (d: ITestTvAd) => { return 1; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.ZeroTest,
                "ZeroTest",
                (d: number) => { return Util.commaShiftingFormatter(d, Util.commaFormatter[0]); },
                $.proxy((p: Util.ILabelKeyValueTuple) => { return 0; }, this),
                (d: ITestTvAd) => { return 1; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.BaselineSpendPlanned,
                "Baseline Spend Planned",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.BaselineSpendPlanned];
                },
                (d: ITestTvAd) => { return d.revId === 0 ? d.spendPlanned : null; },
                (d: ITestTvAd) => { return d.revId === 0 ? 1 : null; },
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[0], true); }
            );

            keyMetricManager.addMetric(
                MetricName.BaselineSpendActual,
                "Baseline Spend Actual",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[1]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.SpendActual];
                },
                (d: ITestTvAd) => { return d.revId === 0 ? d.spendActual : null; },
                (d: ITestTvAd) => { return 1; },
                (d: number) => { return "$" + Util.commaFormatter[0](d); }
            );

            keyMetricManager.addMetric(
                MetricName.BaselineCpmPlanned,
                "Baseline CPM Planned",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); },
                (p: Util.ILabelKeyValueTuple) => {

                    return (p.value.weightTotal[MetricName.CpmPlanned] ? p.value.value[MetricName.CpmPlanned] / p.value.weightTotal[MetricName.CpmPlanned] : 0);
                },
                (d: ITestTvAd) => { return d.revId === 0 ? d.spendPlanned * -1000 : null; },
                (d: ITestTvAd) => { return d.impressionsPlanned; },
                (d: number) => { return "$" + Util.commaFormatter[2](d); }
            );

            keyMetricManager.addMetric(
                MetricName.BaselineCpmActual,
                "Baseline CPM Actual",
                (d: number) => { return Util.currencyShiftingFormatter(d, Util.commaFormatter[2]); },
                (p: Util.ILabelKeyValueTuple) => {
                    return (p.value.weightTotal[MetricName.CpmActual] ? p.value.value[MetricName.CpmActual] / p.value.weightTotal[MetricName.CpmActual] : 0);
                },
                (d: ITestTvAd) => { return d.revId === 0 ? d.spendActual * 1000 : 0; },
                (d: ITestTvAd) => { return d.impressionsActual; },
                (d: number) => { return "$" + Util.commaFormatter[2](d); }
            );

            let eventManager: EventManager.EventManager = new EventManager.EventManager();

            // add modified rows to show differential
            let dataCopy: Array<ITestTvAd> = ads.map((ad: ITestTvAd, index: number) => {
                ad.revId = 1;
                let copy: ITestTvAd = angular_copy(ad);
                copy.revId = 0;
                copy.impressionsActual = index % 200 === 0 ? ad.impressionsActual * 1.005 : ad.impressionsActual;
                copy.spendActual = index % 300 === 0 ? ad.spendActual * 0.99 : ad.spendActual;
                return copy;
            });
            ads = ads.concat(dataCopy);
            this.crossfilterManager = new CrossfilterManager.CrossfilterManager<ITestTvAd>(ads, KeyName.Id, keyMetricManager, eventManager, hiddenAds);

            // build chart manager (note, we are doing this after we created the keyMetricManager, we could have used the default one if we liked)
            this.chartManager = new ChartManager.ChartManager(this.rootScope, this.crossfilterManager, eventManager);

            // make layout manager
            this.chartRowManager = new LayoutManager.ChartRowManager<ITestTvAd>();

            // register charts we will use
            Defaults.registerDefaultCharts(this.chartManager);

            // construct chartSummary
            this.filterChartSummaryVm = new ChartManager.DcChart.FilterChartSummaryVm<ITestTvAd>(this.crossfilterManager, "airings");

            // set sizes
            let veryShortHeight: number = 70;
            let shortHeight: number = 150;
            let normalHeight: number = 200;
            let tallHeight: number = 250;
            let fullWidth: number = 985;
            let threeQuarterWidth: number = fullWidth * 3 / 4;
            let halfWidth: number = fullWidth * 1 / 2;
            let quarterWidth: number = fullWidth * 1 / 4;
            let baseMargin: Util.IMarginObj = { top: 5, right: 35, bottom: 45, left: 60 };
            let twoAxisMargin: Util.IMarginObj = { top: 5, right: 60, bottom: 45, left: 60 };

            // plum, purple-navy, brownish-gray, orange
            let testColors = ["#6f054b", "#14045d", "#808080", "#d04c05"];
            let testColorAccessor = (d, i) => { return i % 4; };
            let testHideZeroTicksFlag = true;
            let testTooltipCharLenShort = 8;
            let testTooltipCharLenLong = 32;
            let valueFunc: any = (p: any) => {
                return p.value["value"][MetricName.ImpressionsActual];
            };
            let orderFuncs: Array<Util.INamedOrderFunc> = [
                <Util.INamedOrderFunc>{
                    name: "Daypart",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => { return groups.sort((a, b) => { return a.key > b.key ? 1 : 0; }); }
                },
                <Util.INamedOrderFunc>{
                    name: "Ascending",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => {
                        return groups.sort((a, b) => { return valueFunc(<Util.ILabelKeyValueTuple>a) - valueFunc(<Util.ILabelKeyValueTuple>b); });
                    }
                },
                <Util.INamedOrderFunc>{
                    name: "Descending",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => {
                        return groups.sort((a, b) => { return valueFunc(<Util.ILabelKeyValueTuple>b) - valueFunc(<Util.ILabelKeyValueTuple>a); });
                    }
                }
            ];
            let pieValueFunc: any = (p: any) => {
                return p.value;
            };
            let pieOrderFuncs: Array<Util.INamedOrderFunc> = [
                <Util.INamedOrderFunc>{
                    name: "Daypart",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => { return groups.sort((a, b) => { return a.key > b.key ? 1 : 0; }); }
                },
                <Util.INamedOrderFunc>{
                    name: "Ascending",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => {
                        return groups.sort((a, b) => { return pieValueFunc(<Util.ILabelKeyValueTuple>a) - pieValueFunc(<Util.ILabelKeyValueTuple>b); });
                    }
                },
                <Util.INamedOrderFunc>{
                    name: "Descending",
                    func: (groups: Array<CrossFilter.Grouping<any, any>>) => {
                        return groups.sort((a, b) => { return pieValueFunc(<Util.ILabelKeyValueTuple>b) - pieValueFunc(<Util.ILabelKeyValueTuple>a); });
                    }
                }
            ];

            // add charts to chart manager
            this.chartManager.addChart(ChartName.ImpressionsPlannedPerDaypart, <ChartManager.DcChart.IFilterPieChart<ITestTvAd>>{
                title: "ImpressionsPlannedPerDaypart: Dayparts (dc filter pie chart)",
                chartType: ChartManager.ChartType.filterPieChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.ExpectedImpressionsByDaypart, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "ExpectedImpressionsByDaypart: Dayparts (dc filter row chart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                rowCap: 8,
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.TopNetworksByImpressionsPlanned, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "TopNetworksByImpressionsPlanned: Top Network (dc filter row chart)",
                chartType: ChartManager.ChartType.filterRowChart,
                type: "filterRowChart",
                hideZeroTicks: testHideZeroTicksFlag,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                rowCap: 7,
                ordering: (d: CrossFilter.Grouping<string, number>) => { return -d.value["value"][MetricName.ImpressionsPlanned]; },
                dynamicHeight: true,
                colors: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"],
                colorAccessor: (d, i) => {
                    switch (d.key) {
                        case "FOX":
                            return 0;
                        case "NICKELODEON":
                            return 1;
                        case "CBS":
                            return 2;
                        case "ABC":
                            return 3;
                        case "ESPN":
                            return 4;
                        case "TNT":
                            return 5;
                        case "HSN":
                            return 6;
                        case "NBC":
                            return 0;
                        case "USA":
                            return 1;
                        case "SHOWTIME":
                            return 2;
                    }
                    return 0;
                }
            });
            this.chartManager.addChart(ChartName.OrderingFloatRowHeght, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "OrderingFloatRowHeght: float height (DcChart.IFilterRowChart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                ordering: (d: CrossFilter.Grouping<string, number>) => { return -d.value["value"][MetricName.ImpressionsPlanned]; },
                dynamicHeight: true,
                fixedBarHeight: 20,
                hideZeroTicks: testHideZeroTicksFlag,
                colors: testColors,
                colorAccessor: testColorAccessor
            });
            this.chartManager.addChart(ChartName.CapNoFloat, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "CapNoFloat: float height (DcChart.IFilterRowChart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                rowCap: 7,
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.CapNoFloatHideOthers, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "CapNoFloatHideOthers: float height (DcChart.IFilterRowChart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                rowCap: 7,
                hideOthers: true,
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.TopMarketsByImpressionsPlanned, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "TopMarketsByImpressionsPlanned: Top Markets (DcChart.IFilterRowChart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Market,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: tallHeight, margin: baseMargin },
                ordering: (d: CrossFilter.Grouping<string, number>) => { return -d.value["value"][MetricName.ImpressionsPlanned]; },
                rowCap: 7,
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.SpendPlannedPerWeek, <ChartManager.DcChart.IFilterBarChart<ITestTvAd>>{
                title: "SpendPlannedPerWeek: Spend Planned per Week (DcChart.IFilterBarChart)",
                chartType: ChartManager.ChartType.filterBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Week,
                    [MetricName.SpendPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                elasticY: true,
                xUnitsOverride: d3_time.weeks,
                colors: testColors,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.ImpressionsPlannedPerWeek, <ChartManager.DcChart.IFilterBarChart<ITestTvAd>>{
                title: "ImpressionsPlannedPerWeek: Impressions Planned per Week (DcChart.IFilterBarChart)",
                chartType: ChartManager.ChartType.filterBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Week,
                    [MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                elasticY: true,
                xUnitsOverride: d3_time.weeks,
                colors: testColors,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.CpmPlannedFilter, <ChartManager.DcChart.IFilterBarChart<ITestTvAd>>{
                title: "CpmPlannedFilter: CPM Planned (DcChart.IFilterBarChart)",
                chartType: ChartManager.ChartType.filterBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.CpmPlanned,
                    [MetricName.ImpressionsPlanned],
                    null,
                    30
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: normalHeight, margin: baseMargin },
                elasticY: true,
                xAxisTicks: 2,
                colors: testColors,
                hideZeroTicks: testHideZeroTicksFlag
            });
            this.chartManager.addChart(ChartName.CpmPlannedPerWeek, <ChartManager.DcChart.IFilterLineChart<ITestTvAd>>{
                title: "CpmPlannedPerWeek: CPM Planned per Week (DcChart.IFilterLineChart)",
                chartType: ChartManager.ChartType.filterLineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Week,
                    [MetricName.CpmPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: threeQuarterWidth, height: normalHeight, margin: baseMargin },
                elasticY: true,
                renderArea: true,
                hideZeroTicks: true
            });

            this.chartManager.addChart(ChartName.ImpressionsActualPerDaypart, <Nvd3Chart.IPieChart<ITestTvAd>>{
                title: "ImpressionsActualPerDaypart: Daypart Impressions (Nvd3Chart.IPieChart)",
                chartType: ChartManager.ChartType.pieChart,
                type: "pieChart",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.ImpressionsActual]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                hideLegend: true,
                donut: true,
                innerRadius: 40,
                hideTitle: false,
                colors: testColors,
                colorAccessor: testColorAccessor,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort,
                orderFuncs: pieOrderFuncs,
                orderFunc: pieOrderFuncs[2],
                showPercents: true,
                maxPartsCount: 5
            });
            this.chartManager.addChart(ChartName.ImpressionsPlannedVsActualPerWeek, <Nvd3Chart.ILineChart<ITestTvAd>>{
                title: "ImpressionsPlannedVsActualPerWeek: Impressions per Week (nvd3 linechart)",
                chartType: ChartManager.ChartType.lineChart,
                yAxisLabel: "Impressions",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Week,
                    [MetricName.ImpressionsActual, MetricName.ImpressionsPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                isArea: $.proxy((d: any) => { return d.key === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.ImpressionsActual).title; }, this),
                hideXAxisLabel: true,
                hideYAxisLabel: false,
                colors: testColors,
                colorAccessor: (d, i) => { return i + 1; },
                caption: "test Caption",
                hideZeroTicks: testHideZeroTicksFlag,
                useInteractiveGuideline: true,
                maxTooltipKeyLen: testTooltipCharLenShort
            });
            this.chartManager.addChart(ChartName.MultiBarTest, <ChartManager.Nvd3Chart.IMultiBarChart<ITestTvAd>>{
                title: "MultiBarTest: Spend Planned vs. Actual per Daypart (Nvd3Chart.IMultiBarChart)",
                chartType: ChartManager.ChartType.multiBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.SpendPlanned, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                hideControls: true,
                colors: testColors,
                colorAccessor: testColorAccessor,
                showValues: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenLong
            });
            this.chartManager.addChart(ChartName.MultiBarHorizontalTest, <ChartManager.Nvd3Chart.IMultiBarChart<ITestTvAd>>{
                title: "MultiBarHorizontalTest: Spend Planned vs. Actual per Daypart H (Nvd3Chart.IMultiBarChart)",
                chartType: ChartManager.ChartType.multiBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.SpendPlanned, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: 600, margin: { top: 0, bottom: 20, left: 110, right: 20 } },
                hideControls: true,
                hideLegend: true,
                isHorizontal: true,
                hideXAxisLabel: true,
                hideYAxisLabel: true,
                showValues: true,
                hideTooltips: true,
                hideZeroTicks: testHideZeroTicksFlag
            });

            this.chartManager.addChart(ChartName.FrozenSummaryScalar, <ScalarChart.ISimpleScalarChartBase<ITestTvAd>>{
                title: "Frozen Summary",
                chartType: ChartManager.ChartType.frozenScalarChart,
                type: "frozenScalarChart",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.Count]
                ),
                frozenData: <Array<ScalarChart.IScalarChartData>>[
                    {
                        key: "FrozenKey1",
                        value: 50000,
                        shortValue: "50k",
                        longValue: "50,000"
                    },
                    {
                        key: "FrozenKey2",
                        value: 150000,
                        shortValue: "150k",
                        longValue: "150,000"
                    }
                ],
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin }
            });

            this.chartManager.addChart(ChartName.FrozenSummaryScalarMulti, <ScalarChart.ISimpleScalarChartBase<ITestTvAd>>{
                title: "Frozen Summary Multi",
                hideZeroTicks: testHideZeroTicksFlag,
                chartType: ChartManager.ChartType.frozenScalarChart,
                type: "frozenScalarChart",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.Count]
                ),
                frozenData: <Array<ScalarChart.IScalarChartData>>[
                    {
                        key: "FrozenKey1",
                        value: 50000,
                        shortValue: "50k",
                        longValue: "50,000"
                    },
                    {
                        key: "FrozenKey2",
                        value: 150000,
                        shortValue: "150k",
                        longValue: "150,000"
                    },
                    {
                        key: "FrozenKey3",
                        value: 250000,
                        shortValue: "250k",
                        longValue: "250,000"
                    }
                ],
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                metricGroups: [{
                    groupKey: "GROUPKEY",
                    ids: ["FrozenKey2", "FrozenKey3"],
                    units: ["unit2", "unit3"]
                }]
            });

            this.chartManager.addChart(ChartName.SummaryScalar, <ScalarChart.ISimpleScalarChartBase<ITestTvAd>>{
                title: "Summary",
                chartType: ChartManager.ChartType.simpleScalarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.SpendPlanned, MetricName.SpendActual, MetricName.CpmPlanned, MetricName.CpmActual]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                getMetricType: $.proxy((d: any) => {
                    if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmPlanned).title) {
                        return ScalarChart.MetricType.division;
                    } else if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmActual).title) {
                        return ScalarChart.MetricType.weightedAverage;
                    } else {
                        return ScalarChart.MetricType.sum;
                    }
                }, this)
            });

            this.chartManager.addChart(ChartName.SummaryScalarMulti, <ScalarChart.ISimpleScalarChartBase<ITestTvAd>>{
                title: "SummaryScalarMulti",
                chartType: ChartManager.ChartType.simpleScalarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.SpendPercentage, MetricName.SpendPlanned, MetricName.SpendActual, MetricName.CpmPlanned, MetricName.CpmActual]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                getMetricType: $.proxy((d: any) => {
                    if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmPlanned).title) {
                        return ScalarChart.MetricType.division;
                    } else if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmActual).title) {
                        return ScalarChart.MetricType.weightedAverage;
                    } else {
                        return ScalarChart.MetricType.sum;
                    }
                }, this),
                metricGroups: [
                    {
                        groupKey: "SPEND",
                        ids: [MetricName.SpendPercentage.toString(), MetricName.SpendPlanned.toString(), MetricName.SpendActual.toString()],
                        units: ["%"]
                    },
                    {
                        groupKey: "CPM",
                        ids: [MetricName.CpmPlanned.toString(), MetricName.CpmActual.toString()],
                        units: []
                    }
                ]
            });

            this.chartManager.addChart(ChartName.CompositeScalar, <ScalarChart.ICompositeScalarChartBase<ITestTvAd>>{
                title: "Composite Summary Multi (Percent Header)",
                chartType: ChartManager.ChartType.compositeScalarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.SpendPlanned, MetricName.SpendActual, MetricName.CpmPlanned, MetricName.CpmActual]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                getMetricType: $.proxy((d: any) => {
                    if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmPlanned).title) {
                        return ScalarChart.MetricType.division;
                    } else if (d === this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.CpmActual).title) {
                        return ScalarChart.MetricType.weightedAverage;
                    } else {
                        return ScalarChart.MetricType.sum;
                    }
                }, this),
                metricGroups: [
                    {
                        groupTitle: "SPEND",
                        headerTooltip: "tooltip test",
                        items: <Array<ScalarChart.ICompositeDataUnit>>[
                            {
                                ids: [MetricName.SpendPlanned.toString(), MetricName.SpendActual.toString()],
                                styles: <ScalarChart.IScalarDataStyle>{ unit: "highlight-largeText" },
                                parentId: MetricName.SpendPercentageFake.toString(),
                                aggregateFunc: (args: Array<number>): number => {
                                    return parseFloat(Util.commaRoundFormatter(args[0] * 100 / args[1], 0)); },
                                posIndex: 0,
                                shortFormatFunc: (x: number): string => { return x.toString(); },
                                longFormatFunc: (x: number): string => { return x.toString(); },
                                unitFunc: (x: ScalarChart.IScalarChartData): string => {
                                    return "%";
                                }
                            },
                            {
                                ids: [MetricName.SpendPlanned.toString()],
                                unit: "Planned"
                            },
                            {
                                ids: [MetricName.SpendActual.toString()],
                                unit: "Actual"
                            }
                        ]
                    },
                    {
                        groupKey: "CPM",
                        items: <Array<ScalarChart.ICompositeDataUnit>>[
                            {
                                ids: [MetricName.CpmPlanned.toString()]
                            },
                            {
                                ids: [MetricName.CpmActual.toString()]
                            }
                        ]
                    }
                ]
            });

            this.chartManager.addChart(ChartName.CompositeScalarWithDiff, <ScalarChart.ICompositeScalarChartBase<ITestTvAd>>{
                title: "Composite Summary Multi (Spend Diff Header)",
                chartType: ChartManager.ChartType.compositeScalarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.SpendActual, MetricName.SpendPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                getMetricType: $.proxy((d: any) => {
                    return ScalarChart.MetricType.sum;
                }, this),
                metricGroups: [
                    {
                        groupKey: "SPEND Actual/Planned",
                        items: <Array<ScalarChart.ICompositeDataUnit>>[
                            {
                                ids: [MetricName.SpendActual.toString(), MetricName.SpendPlanned.toString()],
                                parentId: MetricName.SpendPercentageFake.toString(),
                                changeIndicator: true,
                                aggregateFunc: (args: Array<number>): number => {
                                    return Util.isDefinedNumber(args[0]) && Util.isDefinedNumber(args[1]) && args[1] !== 0
                                        ? (args[0] - args[1]) * 100 / args[1] : null; // v
                                },
                                shortFormatFunc: (x: number): string => { return x.toString(); },
                                longFormatFunc: (x: number): string => { return Util.currencyShiftingFormatter(x, Util.commaFormatter[0]); },
                                unitFunc: (x: ScalarChart.IScalarChartData): string => {
                                    return "%";
                                }
                            },
                            {
                                ids: [MetricName.SpendPlanned.toString()],
                                unit: "Planned"
                            },
                            {
                                ids: [MetricName.SpendActual.toString()],
                                unit: "Actual"
                            }
                        ]
                    }
                ]
            });

            this.chartManager.addChart(ChartName.CompositeScalarWithDiff2, <ScalarChart.ICompositeScalarChartBase<ITestTvAd>>{
                title: "Composite Summary Multi (CPM Diff Header)",
                chartType: ChartManager.ChartType.compositeScalarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Id,
                    [MetricName.CpmActual, MetricName.CpmPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: 120, margin: baseMargin },
                getMetricType: $.proxy((d: any) => {
                    return ScalarChart.MetricType.division;
                }, this),
                metricGroups: [
                    {
                        groupKey: "CPM Actual/Planned",
                        items: <Array<ScalarChart.ICompositeDataUnit>>[
                            {
                                ids: [MetricName.CpmActual.toString(), MetricName.CpmPlanned.toString()],
                                parentId: MetricName.CpmPercentageGroup.toString(),
                                changeIndicator: true,
                                aggregateFunc: (args: number[]): number => {
                                    return Util.isDefinedNumber(args[0]) && Util.isDefinedNumber(args[1]) && args[1] !== 0
                                        ? (args[0] - args[1]) * 100 / args[1] : null;
                                },
                                shortFormatFunc: (x: number): string => { return x.toString(); },
                                longFormatFunc: (x: number): string => { return Util.currencyShiftingFormatter(x, Util.commaFormatter[2]); },
                                unit: "%"
                            },
                            {
                                ids: [MetricName.CpmPlanned.toString()],
                                unit: "Planned (b)"
                            },
                            {
                                ids: [MetricName.CpmActual.toString()],
                                unit: "Actual"
                            }
                        ]
                    }
                ]
            });

            this.chartManager.addChart(ChartName.DiscreteTest, <ChartManager.Nvd3Chart.IDiscreteBarChart<ITestTvAd>>{
                title: "discreteTest (nvd3 discrete bar chart)",
                chartType: ChartManager.ChartType.discreteBarChart,
                type: ChartManager.ChartType.discreteBarChart.toString(),
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.ImpressionsActual]
                ),
                sizeData: <Util.ISizeData>{ width: halfWidth, height: normalHeight, margin: baseMargin },
                showValues: true,
                colors: testColors,
                colorAccessor: testColorAccessor,
                rotateLabels: 30,
                hideMaxMinY: true,
                hideYAxisLabel: true,
                orderFuncs: orderFuncs,
                orderFunc: orderFuncs[0],
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });

            // stackedAreaTests
            this.chartManager.addChart(ChartName.StackedAreaTest1, <ChartManager.Nvd3Chart.IExtendedStackedAreaChart<ITestTvAd>>{
                title: "Top 6 Networks by Spend (Stacked area test)",
                type: "stackedAreaChart",
                chartType: ChartManager.ChartType.stackedAreaChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Market,
                    [MetricName.SpendActual],
                    KeyName.NetworkClone
                ),
                maxSecondaryStreamCount: 6,
                useInteractiveGuideline: true,
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: baseMargin },
                hideControls: false,
                hideLegend: false,
                stackStyle: ChartManager.Nvd3Chart.StackStyle.stream,
                hideYAxisLabel: true,
                hideXAxisLabel: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenLong
            });

            // stackedAreaTests
            this.chartManager.addChart(ChartName.StackedAreaTest2, <ChartManager.Nvd3Chart.IExtendedStackedAreaChart<ITestTvAd>>{
                title: "Top 6 Networks by Spend (Stacked area test with useInteractiveGuideline)",
                chartType: ChartManager.ChartType.stackedAreaChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.WeekClone,
                    [MetricName.SpendActual],
                    KeyName.NetworkClone
                ),
                maxSecondaryStreamCount: 6,
                elasticXAxis: false,
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: baseMargin },
                hideControls: true,
                hideLegend: false,
                stackStyle: ChartManager.Nvd3Chart.StackStyle.stacked,
                hideYAxisLabel: true,
                hideXAxisLabel: true,
                hideMaxMinX: true,
                rotateLabels: -30,
                hideZeroTicks: testHideZeroTicksFlag,
                useInteractiveGuideline: true,
                clipEdge: true,
                maxTooltipKeyLen: testTooltipCharLenLong
            });

            // stackedAreaTests
            this.chartManager.addChart(ChartName.Spark1, <ChartManager.Nvd3Chart.ISparklineChart<ITestTvAd>>{
                title: "Spark1: Spend Plan (Nvd3Chart.ISparklineChart)",
                chartType: ChartManager.ChartType.sparklineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Month,
                    [MetricName.SpendPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: 305, height: 65, margin: <Util.IMarginObj>{ top: 10, bottom: 10, left: 70, right: 100 } },
                isPlus: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });
            this.chartManager.addChart(ChartName.Spark2, <ChartManager.Nvd3Chart.ISparklineChart<ITestTvAd>>{
                title: "Spark2: Spend Actual (Nvd3Chart.ISparklineChart)",
                chartType: ChartManager.ChartType.sparklineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Month,
                    [MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: 105, height: 45, margin: <Util.IMarginObj>{ top: 10, bottom: 10, left: 10, right: 10 } },
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });

            // in inline chart test
            this.chartManager.addChart(ChartName.Spark3, <ChartManager.Nvd3Chart.ISparklineChart<ITestTvAd>>{
                title: "Spark3: Spend Actual (Nvd3Chart.ISparklineChart)",
                chartType: ChartManager.ChartType.sparklineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Month,
                    [MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: 165, height: 45, margin: <Util.IMarginObj>{ top: 10, bottom: 10, left: 10, right: 70 } },
                hideTitle: true,
                isPlus: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });
            // in inline chart test
            this.chartManager.addChart(ChartName.Spark4, <ChartManager.Nvd3Chart.ISparklineChart<ITestTvAd>>{
                title: "Spark4: Spend Planned (Nvd3Chart.ISparklineChart)",
                chartType: ChartManager.ChartType.sparklineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Month,
                    [MetricName.SpendPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: 165, height: 45, margin: <Util.IMarginObj>{ top: 10, bottom: 10, left: 10, right: 70 } },
                hideTitle: true,
                isPlus: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });
            // in inline chart test
            this.chartManager.addChart(ChartName.Spark5, <ChartManager.Nvd3Chart.ISparklineChart<ITestTvAd>>{
                title: "Spark5: CPM Actual (Nvd3Chart.ISparklineChart)",
                chartType: ChartManager.ChartType.sparklineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Month,
                    [MetricName.CpmActual]
                ),
                sizeData: <Util.ISizeData>{ width: 165, height: 45, margin: <Util.IMarginObj>{ top: 10, bottom: 10, left: 10, right: 70 } },
                hideTitle: true,
                isPlus: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort
            });

            // filter for testing single day line test chart
            this.chartManager.addChart(ChartName.ImpsPerDayFilter, <ChartManager.DcChart.IFilterRowChart<ITestTvAd>>{
                title: "ImpsPerDayFilter: Imps per Day (DcChart.IFilterRowChart)",
                chartType: ChartManager.ChartType.filterRowChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Day,
                    [MetricName.ImpressionsActual]
                ),
                hideZeroTicks: testHideZeroTicksFlag,
                sizeData: <Util.ISizeData>{ width: quarterWidth, height: normalHeight, margin: baseMargin }
            });
            // single point line chart test
            this.chartManager.addChart(ChartName.DayLineTest, <ChartManager.Nvd3Chart.ILineChart<ITestTvAd>>{
                title: "DayLineTest: DayLineChart (Nvd3Chart.ILineChart)",
                chartType: ChartManager.ChartType.lineChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Date,
                    [MetricName.ImpressionsActual, MetricName.ImpressionsPlanned]
                ),
                hideZeroTicks: testHideZeroTicksFlag,
                sizeData: <Util.ISizeData>{ width: threeQuarterWidth, height: normalHeight, margin: baseMargin },
                isArea: (d: any) => { return true; },
                useInteractiveGuideline: true,
                maxTooltipKeyLen: testTooltipCharLenLong
            });

            // displayMetricAsCumulativeSeries test
            let unfilteredTitleAppend: string = " (Unfiltered long long long long)";
            this.chartManager.addChart(ChartName.DisplayMetricAsCumulativeSeriesTest, <ChartManager.Nvd3Chart.ILineChart<ITestTvAd>>{
                title: "DisplayMetricAsCumulativeSeries (nvd3 line chart)",
                chartType: ChartManager.ChartType.lineChart,
                type: "lineChart",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Date,
                    [MetricName.ImpressionsActual, MetricName.ImpressionsActual, MetricName.ConstantGoal]
                ),
                sizeData: <Util.ISizeData>{ width: threeQuarterWidth, height: normalHeight, margin: baseMargin },
                isArea: $.proxy((d: any) => {
                    let title: string = this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.ImpressionsActual).title;
                    return (d.key === title || d.key === (title + unfilteredTitleAppend));
                }, this),
                displayMetricAsCumulativeSeries: (metric: CrossfilterManager.IMetric<ITestTvAd>) => {
                     return metric === keyMetricManager.getMetric(MetricName.ImpressionsActual);
                },
                saveUnfilteredData: true,
                hideZeroTicks: testHideZeroTicksFlag,
                unfilteredTitleAppend: unfilteredTitleAppend,
                useInteractiveGuideline: true,
                displayMetricUnfilteredSeries: (metric: CrossfilterManager.IMetric<ITestTvAd>, seriesId: number) => {
                    return seriesId === 1 && metric === keyMetricManager.getMetric(MetricName.ImpressionsActual);
                },
                rotateLabels: -30,
                colors: ["blue", "lightBlue", "green"],
                colorAccessor: (d) => {
                    let title1: string = this.crossfilterManager.getKeyMetricManager().getMetric(MetricName.ImpressionsActual).title;
                    let title2: string = title1 + unfilteredTitleAppend;
                    return (d.key === title1) ? 0 : ((d.key === title2) ? 1 : 2);
                },
                maxTooltipKeyLen: testTooltipCharLenShort,
                classes: "hidePoints",
                clipData: (metric: CrossfilterManager.IMetric<ITestTvAd>, seriesId?: number) => {
                    if (metric === keyMetricManager.getMetric(MetricName.ImpressionsActual)) {
                        return { max: moment("2016 06 15", "YYYY MM DD").startOf("week").add(1, "day"), displayZeros: false };
                    }
                    return null;
                },
                floatLegend: true
            });

            // zeroCumulativeSeries test
            this.chartManager.addChart(ChartName.ZeroAsCumulativeSeriesTest, <ChartManager.Nvd3Chart.IDiscreteBarChart<ITestTvAd>>{
                title: "ZeroAsCumulativeSeriesTest Test",
                chartType: ChartManager.ChartType.discreteBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.MonthClone,
                    [MetricName.ZeroTest]
                ),
                sizeData: <Util.ISizeData>{ width: threeQuarterWidth, height: normalHeight, margin: baseMargin },
                displayMetricAsCumulativeSeries: (metric: CrossfilterManager.IMetric<ITestTvAd>) => { return true; },
                treatZerosAsNulls: false, // test showing zero columns
                showValues: true,
                nullLabel: "n/a",
                clipData: (metric: CrossfilterManager.IMetric<ITestTvAd>, seriesId?: number) => {
                    if (metric === keyMetricManager.getMetric(MetricName.ZeroTest)) {
                        return { max: moment("2013 07 01", "YYYY MM DD").startOf("week").add(1, "day"), displayZeros: true };
                    }
                    return null;
                }
            });

            // multiChartTest
            this.chartManager.addChart(ChartName.MultiChartTest, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "MultiChartTest: Multi Test (Nvd3Chart.IMultiChart)",
                type: "multiChart",
                chartType: ChartManager.ChartType.multiChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Network,
                    [MetricName.ImpressionsActual, MetricName.ImpressionsPlanned, MetricName.SpendActual, MetricName.SpendPlanned]
                ),
                sizeData: <Util.ISizeData>{ width: threeQuarterWidth, height: tallHeight, margin: twoAxisMargin },
                hideXAxisLabel: true,
                hideYAxisLabel: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenLong,
                yAxisLabel: "side a",
                rightYAxisLabel: "side b",
                colors: testColors,
                selectedMetricGroupIndex: 1, // defaults to 0 if not specified
                metricToggleGroups: [ // ignored if length is < 2
                    { label: "PLANNED",
                      ids: [MetricName.ImpressionsPlanned.toString(), MetricName.SpendPlanned.toString()] },
                    { label: "ACTUAL",
                      ids: [MetricName.ImpressionsActual.toString(), MetricName.SpendActual.toString()] }
                ],
                multiChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString() || d.id === MetricName.ImpressionsPlanned.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.bar,
                            yAxisIndex: 1,
                            metricDefinesAxis: true
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString() || d.id === MetricName.SpendPlanned.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                            yAxisIndex: 2,
                            metricDefinesAxis: true
                        };
                    }
                    return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                        chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                        yAxisIndex: 1
                    };
                }, this)
            });

            // TimeSeries test
            this.chartManager.addChart(ChartName.TimeSeries, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "WebSpike Example (Nvd3Chart.IMultiChart)",
                chartType: ChartManager.ChartType.linePlusBarChart,
                type: "linePlusBarChart",
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Date,
                    [MetricName.ImpressionsActual, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: twoAxisMargin },
                hideXAxisLabel: true,
                hideYAxisLabel: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                hideZeroTicks: testHideZeroTicksFlag,
                maxTooltipKeyLen: testTooltipCharLenShort,
                colors: testColors,
                legendLeftAxisHint: "",
                yAxisLabel: "Impressions",
                rightYAxisLabel: "Spend",
                focusShowAxisY: false,
                focusEnable: true,
                focusHeight: 35,
                linePlusBarChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString()) {
                        return <ChartManager.Nvd3Chart.ILinePlusBarChartSeries>{
                            isBar: true,
                            yAxisIndex: 1,
                            metricDefinesAxis: true,
                            color: "blue"
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString()) {
                        return <ChartManager.Nvd3Chart.ILinePlusBarChartSeries>{
                            isBar: false,
                            yAxisIndex: 2,
                            metricDefinesAxis: true,
                            color: "purple"
                        };
                    }
                    return <ChartManager.Nvd3Chart.ILinePlusBarChartSeries>{
                        isBar: false,
                        yAxisIndex: 1
                    };
                }, this)
            });

            this.chartManager.addChart(ChartName.MultiTicksExample, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "MultiTicks Example (Nvd3Chart.IMultiChart)",
                type: "multiChart",
                chartType: ChartManager.ChartType.multiChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.WeekClone,
                    [MetricName.ImpressionsActual, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: twoAxisMargin },
                treatDatesAsCatagories: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                hideZeroTicks: testHideZeroTicksFlag,
                colors: testColors,
                xAxisTicks: 3, // not working
                yAxisLabel: "Impressions",
                rotateLabels: -30,
                multiChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.bar,
                            yAxisIndex: 1,
                            metricDefinesAxis: true
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                            yAxisIndex: 2,
                            metricDefinesAxis: true
                        };
                    }
                    return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                        chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                        yAxisIndex: 2
                    };

                }, this)
            });

            // based on values used in test-report.ctrl
            let maxPerWeek: number = Math.ceil(1000 / 26);
            let spendLower: number = 1000 * maxPerWeek;
            let spendUpper: number = 6000 * maxPerWeek;
            let impLower: number = 1125000 * 3.5 * maxPerWeek;
            let impUpper: number = 4500000 * 3.5 * maxPerWeek;
            this.chartManager.addChart(ChartName.YDomainExampleBase, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "yDomain Example (Base)",
                chartType: ChartManager.ChartType.multiChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.WeekClone,
                    [MetricName.ImpressionsActual, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: twoAxisMargin },
                treatDatesAsCatagories: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                yDomain1: [0, impUpper],
                yDomain2: [0, spendUpper],
                hideZeroTicks: testHideZeroTicksFlag,
                colors: testColors,
                rotateLabels: -30,
                multiChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.bar,
                            yAxisIndex: 1,
                            metricDefinesAxis: true
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                            yAxisIndex: 2,
                            metricDefinesAxis: true
                        };
                    }
                    return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                        chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                        yAxisIndex: 2
                    };

                }, this)
            });

            this.chartManager.addChart(ChartName.YDomainExampleScaled, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "YDomainExampleScaled: yDomain Scaled Example (Nvd3Chart.IMultiChart)",
                chartType: ChartManager.ChartType.multiChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.WeekClone,
                    [MetricName.ImpressionsActual, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: twoAxisMargin },
                treatDatesAsCatagories: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                yDomain1: [0, impUpper * 2.5],
                yDomain2: [0, spendUpper * 2.5],
                hideZeroTicks: testHideZeroTicksFlag,
                colors: testColors,
                rotateLabels: -30,
                multiChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.bar,
                            yAxisIndex: 1,
                            metricDefinesAxis: true
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                            yAxisIndex: 2,
                            metricDefinesAxis: true
                        };
                    }
                    return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                        chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                        yAxisIndex: 2
                    };

                }, this)
            });

            this.chartManager.addChart(ChartName.YDomainExampleOffset, <ChartManager.Nvd3Chart.IMultiChart<ITestTvAd>>{
                title: "YDomainExampleOffset: yDomain Offset Example (Nvd3Chart.IMultiChart)",
                chartType: ChartManager.ChartType.multiChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.WeekClone,
                    [MetricName.ImpressionsActual, MetricName.SpendActual]
                ),
                sizeData: <Util.ISizeData>{ width: fullWidth, height: tallHeight, margin: twoAxisMargin },
                treatDatesAsCatagories: true,
                hideMaxMinX: true,
                hideMaxMinY: true,
                yDomain1: [impLower * 0.5, impUpper + impLower * 0.5],
                yDomain2: [spendLower * 1.8, spendUpper + spendLower * 1.8],
                hideZeroTicks: testHideZeroTicksFlag,
                colors: testColors,
                rotateLabels: -30,
                multiChartSeries: $.proxy((d: CrossfilterManager.IMetric<ITestTvAd>) => {
                    if (d.id === MetricName.ImpressionsActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.bar,
                            yAxisIndex: 1,
                            metricDefinesAxis: true
                        };
                    }
                    if (d.id === MetricName.SpendActual.toString()) {
                        return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                            chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                            yAxisIndex: 2,
                            metricDefinesAxis: true
                        };
                    }
                    return <ChartManager.Nvd3Chart.IMultiChartSeries>{
                        chartType: ChartManager.Nvd3Chart.MultiChartType.line,
                        yAxisIndex: 2
                    };
                }, this)
            });

            this.chartManager.addChart(ChartName.OneFilterTest, <OneChart.IOneFilterBarChart<ITestTvAd>>{
                title: "oneFilterTest (one filter bar chart)",
                unitHeader: "IMPs",
                chartType: ChartManager.ChartType.oneFilterBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Market,
                    [MetricName.SpendActual]
                ),
                showXAxis: true,
                showValueText: true,
                sizeData: <Util.ISizeData>{ width: 390, height: tallHeight, margin: baseMargin }
            });

            this.chartManager.addChart(ChartName.OneFilterTest2, <OneChart.IOneFilterBarChart<ITestTvAd>>{
                title: "oneFilterTest (one filter bar chart)",
                unitHeader: "IMPs",
                chartType: ChartManager.ChartType.oneFilterBarChart,
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.NetworkClone,
                    [MetricName.SpendActual]
                ),
                showXAxis: true,
                showValueText: true,
                sizeData: <Util.ISizeData>{ width: 390, height: tallHeight, margin: baseMargin }
            });

            this.chartManager.addChart(ChartName.OneFilterTest2, <OneChart.IOneFilterBarChart<ITestTvAd>>{
                title: "oneFilterTest 2 (one filter bar chart)",
                chartType: ChartManager.ChartType.oneFilterBarChart,
                type: ChartManager.ChartType.oneFilterBarChart.toString(),
                crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ITestTvAd>(
                    this.crossfilterManager,
                    KeyName.Daypart,
                    [MetricName.ImpressionsPlanned]
                ),
                showXAxis: false,
                showValueText: false,
                barHeight: 14,
                barWidth: 200,
                labelTooltipOffsetLeft: 120,
                sizeData: <Util.ISizeData>{ width: 320, height: tallHeight, margin: baseMargin },
                initialState: <ChartManager.AbstractChartViewModelBase.IFilterBarChartState>{
                    filterValues: <{ [key: string]: boolean; }>{
                        "0.Morning": true,
                        "1.Daytime": true
                    }
                }
            });

            // add rows of charts where we want them on this page
            let testSet: string = "nvd3"; // "default", "oneFilterTest", "yDomainTest", "defaultHideScalar", "kpiOnly"
            let rowNumber: number = 0;
            switch (testSet) {
                case "oneFilterTest":
                    {
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.TopNetworksByImpressionsPlanned), rowNumber, 0, ChartGroupName.Main);
                        rowNumber++;
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), rowNumber, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest2), rowNumber, 1, ChartGroupName.Main);
                        rowNumber++;
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), rowNumber, 0, ChartGroupName.Main);
                        rowNumber++;
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), rowNumber, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), 1, 0, ChartGroupName.Accordion);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest2), 2, 0, ChartGroupName.Accordion);
                        break;
                    }
                case "yDomainTest":
                    {
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.YDomainExampleScaled), 0, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.YDomainExampleBase), 1, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.YDomainExampleOffset), 2, 0, ChartGroupName.Main);
                        break;
                    }
                case "cumulative":
                    {
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpsPerDayFilter), 0, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.DisplayMetricAsCumulativeSeriesTest), 0, 1, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ZeroAsCumulativeSeriesTest), 0, 1, ChartGroupName.Main);
                        break;
                    }
                case "nvd3":
                    {
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.MultiChartTest), rowNumber++, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.StackedAreaTest1), rowNumber++, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.DisplayMetricAsCumulativeSeriesTest), rowNumber++, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest2), rowNumber++, 0, ChartGroupName.Main);
                        this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), rowNumber++, 0, ChartGroupName.Main);
                        break;
                    }
                case "kpiOnly":
                {
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.FrozenSummaryScalar), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.FrozenSummaryScalarMulti), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.SummaryScalar), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.SummaryScalarMulti), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CompositeScalar), rowNumber, 0, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CompositeScalarWithDiff), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CompositeScalarWithDiff2), rowNumber, 1, ChartGroupName.Main);
                    break;
                }
                default:
                {
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.SummaryScalar), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.SummaryScalarMulti), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.MultiBarHorizontalTest), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpressionsPlannedVsActualPerWeek), rowNumber, 1, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.MultiBarTest), rowNumber, 2, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpressionsActualPerDaypart), rowNumber, 3, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpressionsPlannedPerDaypart), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ExpectedImpressionsByDaypart), rowNumber, 1, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.TopNetworksByImpressionsPlanned), rowNumber, 2, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OrderingFloatRowHeght), rowNumber, 3, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CapNoFloat), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CapNoFloatHideOthers), rowNumber, 1, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.TopMarketsByImpressionsPlanned), rowNumber, 2, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.SpendPlannedPerWeek), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpressionsPlannedPerWeek), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CpmPlannedFilter), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.CpmPlannedPerWeek), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.DiscreteTest), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.StackedAreaTest1), rowNumber, 1, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.StackedAreaTest2), rowNumber, 2, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.Spark1), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.Spark2), rowNumber, 1, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.ImpsPerDayFilter), rowNumber, 0, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.DayLineTest), rowNumber, 1, ChartGroupName.Main);
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.DisplayMetricAsCumulativeSeriesTest), rowNumber, 2, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.MultiChartTest), rowNumber, 0, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.TimeSeries), rowNumber, 0, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.MultiTicksExample), rowNumber, 0, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest), rowNumber, 0, ChartGroupName.Main);
                    rowNumber++;
                    this.chartRowManager.addChart(this.chartManager.getChart(ChartName.OneFilterTest2), 0, 0, ChartGroupName.Accordion);
                    break;
                }
            }

            // init charts after defining all charts
            this.chartManager.initializeCharts();

            if (testSet === "defaultHideScalar") {
                this.chartManager.updateState(<ChartManager.AbstractChartViewModelBase.IModelState>{
                    ids: [ChartName.SummaryScalar.toString()],
                    isVisible: true,
                    modelStates: [
                        <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmPlanned.toString()], isVisible: true },
                        <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendActual.toString()], isVisible: true },
                        <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmActual.toString()], isVisible: true },
                        <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendPlanned.toString()], isVisible: false } // hide the KPI
                    ]
                }, false);

                this.chartManager.updateState(<ChartManager.AbstractChartViewModelBase.IModelState>{
                    ids: [ChartName.SummaryScalarMulti.toString()], isVisible: true,
                    modelStates: [
                        <ChartManager.AbstractChartViewModelBase.IModelState>{
                            ids: ["CPM"], isVisible: true,
                            modelStates: [
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendPlanned.toString()], isVisible: true },
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendPercentage.toString()], isVisible: true }
                            ]
                        },
                        <ChartManager.AbstractChartViewModelBase.IModelState>{
                            ids: ["SPEND"], isVisible: true,
                            modelStates: [
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmActual.toString()], isVisible: true },
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmPlanned.toString()], isVisible: true }
                            ]
                        }
                    ]
                }, false);

                this.chartManager.updateState(<ChartManager.AbstractChartViewModelBase.IModelState>{
                    ids: [ChartName.CompositeScalar.toString()], isVisible: true,
                    modelStates: [
                        <ChartManager.AbstractChartViewModelBase.IModelState>{
                            ids: ["CPM"], isVisible: true,
                            modelStates: [
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmActual.toString()], isVisible: true },
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.CpmPlanned.toString()], isVisible: true }
                            ]
                        },
                        <ChartManager.AbstractChartViewModelBase.IModelState>{
                            ids: ["SSPPEENNDD"], isVisible: true,
                            modelStates: [
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendActual.toString()], isVisible: true },
                                <ChartManager.AbstractChartViewModelBase.IModelState>{ ids: [MetricName.SpendPlanned.toString()], isVisible: true }
                            ]
                        }
                    ]
                }, false);
            }
        }
    }
// }