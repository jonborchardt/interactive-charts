"use strict";

import * as angular from "angular";
import "angular-ui-router";
import "angular-highlightjs";
import "angular-nvd3";

import { OriginalController } from "./examples/original.controller";
import { CrossfilterOnlyController } from "./examples/crossfilter-only.controller";
import { RangeOnlyBoxPlotChartController } from "./examples/range-only-box-plot-chart.controller";
import { SecondaryDimensionController } from "./examples/secondary-dimension.controller";
import { TvReportCtrl } from "./test-report.ctrl";
import { ExampleBuilderService } from "./examples/example-builder.service";
import { configRoutes } from "./routes";
import { configModule } from "./config";

export class App {
    public app: ng.IModule;

    public static $inject: Array<string> = ["$stateProvider", "$templateCache", "$urlRouterProvider"];

        constructor() {
        this.app = angular.module("chartsApp",
            [
                "ui.router",
                "hljs",
                "nvd3",
                "interactive.charts"
            ])
            .service("exampleBuilderService", ExampleBuilderService)
            .controller("crossfilterOnlyController", CrossfilterOnlyController)
            .controller("rangeOnlyBoxPlotChartController", RangeOnlyBoxPlotChartController)
            .controller("secondaryDimensionController", SecondaryDimensionController)
            .controller("TvReportCtrl", TvReportCtrl)
            .controller("originalController", OriginalController)

            .config(configRoutes)
            .config(configModule)

            .run((
                $rootScope: ng.IRootScopeService,
                $state: any,
                $stateParams: any) => {
                (<any>$rootScope).$state = $state;
                (<any>$rootScope).$stateParams = $stateParams;
            });
    }
}

var app = new App();
angular.element(document).ready(function() {
    angular.bootstrap(document, ["chartsApp"]);
});
