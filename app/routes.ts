import { IStateProvider, IUrlRouterProvider } from "angular-ui-router";

export function configRoutes($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider): void {
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "app/examples/examples.html"
        })
        .state("crossfilterOnly", {
            url: "/crossfilterOnly",
            templateUrl: "app/examples/crossfilter-only.tpl.html",
            controller: "crossfilterOnlyController",
            controllerAs: "vm"
        })
        .state("secondaryDimension", {
            url: "/secondaryDimension",
            templateUrl: "app/examples/secondary-dimension.tpl.html",
            controller: "secondaryDimensionController",
            controllerAs: "vm"
        })
        .state("rangeOnlyBoxPlotChart", {
            url: "/rangeOnlyBoxPlotChart",
            templateUrl: "app/examples/range-only-box-plot-chart.tpl.html",
            controller: "rangeOnlyBoxPlotChartController",
            controllerAs: "vm"
        })
        .state("original", {
            url: "/original",
            templateUrl: "app/examples/original.tpl.html",
            controller: "originalController",
            controllerAs: "vm"
        });
    // For any unmatched url
    $urlRouterProvider
        .otherwise("/crossfilterOnly");
}

configRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];
