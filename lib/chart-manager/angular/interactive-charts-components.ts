/// <reference path="../dc/angular-dc.ts" />

"use strict";

import * as angular from "angular";
import * as nvd3 from "nvd3";

declare var require: any;

export class Modules {
    public static charts: ng.IModule = angular.module("interactive.charts", [
        "angularDc"
    ]);
}

Modules.charts
    .directive("filterChartSummary", () => {
        return {
            restrict: "E",
            scope: {
                vm: "="
            },
            template: require("../../../lib/chart-manager/dc/interactive-filter-chart-summary.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveChartList", () => {
        return {
            restrict: "E",
            scope: {
                group: "="
            },
            template: require("../../../lib/layout-manager/interactive-chart-list.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveOneChartAccordion", () => {
        return {
            restrict: "E",
            scope: {
                group: "="
            },
            link: (scope, element, attr) => {
                // set open state to open for the first one filters
                (<any>scope).activePanels = [0];
            },
            template: require("../../../lib/chart-manager/one/interactive-one-chart-accordion.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveChart", ($timeout) => {
        return {
            restrict: "E",
            scope: {
                chart: "=",
                inAccordion: "@"
            },
            link: (scope, element, attr) => {
                // after link, we want to alert any charts that care that they have been rendered
                $timeout(function () {
                    if (angular.isDefined((<any>scope).chart) && angular.isDefined((<any>scope).chart.chartVm) &&
                        angular.isDefined((<any>scope).chart.chartVm.onRender)) {
                        (<any>scope).chart.chartVm.onRender();
                    }
                });
            },
            template: require("../../../lib/chart-manager/interactive-chart.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveScalarChart", () => {
        return {
            restrict: "E",
            scope: {
                chart: "="
            },
            template: require("../../../lib/chart-manager/scalar/interactive-scalar-chart.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveNvd3Chart", () => {
        return {
            restrict: "E",
            scope: {
                chart: "="
            },
            template: require("../../../lib/chart-manager/nvd3/interactive-nvd3-chart.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveDcChart", () => {
        return {
            restrict: "E",
            scope: {
                chart: "="
            },
            template: require("../../../lib/chart-manager/dc/interactive-dc-chart.tpl.html")
        };
    });

Modules.charts
    .directive("interactiveOneFilterChart", () => {
        return {
            restrict: "E",
            scope: {
                chart: "=",
                inAccordion: "@"
            },
            template: require("../../../lib/chart-manager/one/interactive-one-filter-chart.tpl.html")
        };
    });
