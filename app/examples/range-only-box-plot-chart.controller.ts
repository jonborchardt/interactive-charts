"use strict";

require("node_modules/highlight.js/lib/highlight.js");
require("node_modules/highlight.js/styles/vs.css");

import "./examples.less";
import "./secondary-dimension.less";
import * as d3 from "d3";
import * as dc from "dc";

import {
    CrossfilterManager,
    ChartManager,
    EventManager,
    Util,
    Defaults
} from "../../lib/index";

import {
    ISimpleData,
    KeyName,
    ExampleBuilderService,
    MetricName
} from "./example-builder.service";

export class RangeOnlyBoxPlotChartController {
    private crossfilterManager: CrossfilterManager.ICrossfilterManager<ISimpleData>;
    private chartManager: ChartManager.IChartManager<ISimpleData>;
    private keyMetricManager = new CrossfilterManager.KeyMetricManager<ISimpleData>();
    private data: Array<ISimpleData> = [];
    public options: any = {};
    public ngNvd3Config: ChartManager.Nvd3Chart.INgNvd3Config = {};
    public filterClick: () => void;

    static $inject: string[] = ["$rootScope", "$scope", "exampleBuilderService"];
    constructor(
        protected $rootScope: ng.IRootScopeService,
        protected $scope: ng.IScope,
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

        // build chart manager
        this.chartManager = new ChartManager.ChartManager(this.$rootScope, this.crossfilterManager, eventManager);

        // register charts we will use, we could register any supported charting library, but we will use the default one
        Defaults.registerDefaultCharts(this.chartManager);

        // add charts to manager
        const valueArrayMetricNames = [];
        for (var j = 0; j < ExampleBuilderService.valueCount; j++) {
            valueArrayMetricNames.push(ExampleBuilderService.getValueMetricName(j));
        }
        this.chartManager.addChart("RangeOnlyBoxPlotChart1_ID", <ChartManager.Nvd3Chart.IRangeOnlyBoxPlotChart<ISimpleData>>{
            title: "Spend per User (by Day)",
            chartType: ChartManager.ChartType.rangeOnlyBoxPlotChart,
            crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ISimpleData>(
                this.crossfilterManager,
                KeyName.User,
                valueArrayMetricNames // multiple metrics
            ),
            sizeData: <Util.ISizeData>{
                width: ExampleBuilderService.defaultChartWidth,
                height: ExampleBuilderService.defaultChartHeight
            },
            hideXAxisLabel: true,
            hideMaxMinY: true
        });

        // add charts to manager
        this.chartManager.addChart("RangeOnlyBoxPlotChart2_ID", <ChartManager.Nvd3Chart.IRangeOnlyBoxPlotChart<ISimpleData>>{
            title: "Spend per Day (by User)",
            type: "rangeOnlyBoxPlotChart",
            chartType: ChartManager.ChartType.rangeOnlyBoxPlotChart,
            crossfilterGrouping: new CrossfilterManager.CrossfilterGrouping<ISimpleData>(
                this.crossfilterManager,
                KeyName.Day,
                [MetricName.Amount], // single metric
                KeyName.User // secondary dimension
            ),
            sizeData: <Util.ISizeData>{
                width: ExampleBuilderService.defaultChartWidth,
                height: ExampleBuilderService.defaultChartHeight
            },
            colors: ["green", "orange", "yellow", "brown"],
            outlierColorAccessor: (d, i) => {
                switch (d) {
                    case "Jon": {
                        return "indigo";
                    }
                    case "Sam": {
                        return "blue";
                    }
                    case "Jill": {
                        return "violet";
                    }
                }
                return "black";
            },
            maxBoxWidth: 40,
            hideYAxis: true,
            hideXAxisLabel: true
        });
    }
}