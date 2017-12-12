// module InteractiveChartsExampleApp.Examples.CrossfilterOnly {
"use strict";

import "node_modules/angular-highlightjs/angular-highlightjs";
import "node_modules/highlight.js/styles/vs.css";

import "./crossfilter-only.less";
import "./examples.less";

import * as d3 from "d3";
import * as dc from "dc";

import {
    CrossfilterManager,
    ChartManager,
    EventManager,
    Util
} from "../../lib/index";

import {
    ISimpleData,
    KeyName,
    ExampleBuilderService,
    MetricName
} from "./example-builder.service";

export class CrossfilterOnlyController {
    private crossfilterManager: CrossfilterManager.ICrossfilterManager<ISimpleData>;
    private keyMetricManager = new CrossfilterManager.KeyMetricManager<ISimpleData>();
    private data: Array<ISimpleData> = [];
    public options: any = {};
    public ngNvd3Config: ChartManager.Nvd3Chart.INgNvd3Config = {};
    public output: any = [];
    public filterClick: () => void;

    static $inject: string[] = ["$rootScope", "$scope", "exampleBuilderService"];
    constructor(
        protected $rootScope: ng.IRootScopeService,
        protected $scope: ng.IScope,
        // exampleBuilderService: InteractiveChartsExampleApp.Examples.ExampleBuilderService) {
        exampleBuilderService: ExampleBuilderService
    ) {

        // populate data
        this.data = exampleBuilderService.getSimpleData();

        // set up keys
        exampleBuilderService.addSimpleKeys(this.keyMetricManager);

        // set up metrics
        exampleBuilderService.addSimpleMetrics(this.keyMetricManager);

        // set up event manager
        let eventManager: EventManager.EventManager = new EventManager.EventManager();

        // set up crossfilter manager
        this.crossfilterManager = new CrossfilterManager.CrossfilterManager<ISimpleData>(this.data, KeyName.Id, this.keyMetricManager, eventManager);

        // given only a crossfilterManager, we are able to construct a chart without the rest of the lib

        // set up groupings
        let dayGrouping = new CrossfilterManager.CrossfilterGrouping<ISimpleData>(
            this.crossfilterManager,
            KeyName.Day,
            [MetricName.Amount]
        );
        let userGrouping = new CrossfilterManager.CrossfilterGrouping<ISimpleData>(
            this.crossfilterManager,
            KeyName.User,
            [MetricName.Amount]
        );

        // can now use dayGrouping.group and newGroup.dimension directly in a dcChart
        let chart = dc.barChart("#simple-dc-test");
        chart
            .width(ExampleBuilderService.defaultChartWidth)
            .height(ExampleBuilderService.defaultChartHeight)
            .x(d3.time.scale().domain([new Date(2016, 0, 12), new Date(2016, 0, 16)]))
            .y(d3.scale.linear().domain([0, 60]))
            .xUnits(() => { return 4; })
            .gap(5)
            .xAxisLabel("Day")
            .yAxisLabel("Amount per day")
            .dimension(dayGrouping.dimension)
            .group(dayGrouping.group)
            .valueAccessor(this.keyMetricManager.getMetric(MetricName.Amount).valueFunc);
        chart.xAxis().ticks(5);
        chart.xAxis().tickFormat(this.keyMetricManager.getKey(KeyName.Day).shortFormatFunc);
        chart.on("filtered", () => { eventManager.publish("filtered", this); });
        chart.render();

        // or convert to a data array via userGrouping.group.top(Infinity)
        let createOutput = () => {
            this.output = [{
                key: "s1",
                values: userGrouping.group.top(Infinity).map((v) => {
                    return { label: v.key, value: this.keyMetricManager.getMetric(MetricName.Amount).valueFunc(v) };
                }).reverse()
            }];
        };
        createOutput();
        this.options = {
            chart: {
                type: "discreteBarChart",
                height: ExampleBuilderService.defaultChartHeight,
                width: ExampleBuilderService.defaultChartWidth,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: (d) => { return d.label; },
                y: (d) => { return d.value; },
                showValues: true,
                valueFormat: (d) => {
                    return d3.format(",.1f")(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: "User",
                    tickFormat: this.keyMetricManager.getKey(KeyName.User).shortFormatFunc
                },
                yAxis: {
                    axisLabel: "Amount per user",
                    axisLabelDistance: -10
                }
            }
        };

        this.ngNvd3Config = {
            deepWatchOptions: true,
            deepWatchData: true, // needed to update charts on filter
            deepWatchDataDepth: 1
        };

        // if using other charts, you need to listen to the eventManager for filter/rerender events
        // subscribe AFTER charts to ensure to trigger correct refresh
        exampleBuilderService.signupForFilterEvents(eventManager, $rootScope, createOutput);
    }
}
