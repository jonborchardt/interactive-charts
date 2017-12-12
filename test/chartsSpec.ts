/// <reference path="../typings/index.d.ts" />
/// <reference path="../dist/adap-charts.d.ts" />
module Test {
    "use strict";

    describe("Test setup", function () {

        beforeEach(angular.mock.module("app"));

        var $scope;
        beforeEach(inject(($rootScope) => {
            $scope = $rootScope.$new();
            $scope.$digest();
        }));

        afterEach(() => {
            $scope.$destroy();
        });

        describe("test should run", () => {
            it("Test should run", () => {
                expect(1 + 1).toEqual(2);
            });
        });

        describe("testAppController", () => {
            var _compile,
                _scope,
                template;

            beforeEach(inject(($compile, $controller, $rootScope, $templateCache) => {
                _compile = $compile;
                _scope = $scope;
                $controller("appController", {
                    $scope: _scope
                });
                template = _compile("<div id='eleme'>hi</div>")(_scope);
                _scope.$digest();
                _scope.templateAsHtml = template;
            }));

            it("services should be accessible", () => {
                expect(_compile).toBeDefined();
                expect(_scope).toBeDefined();
                expect(template).toBeDefined();
                expect(_scope.templateAsHtml).toBeDefined();
                expect(_scope.templateAsHtml.find("div")).toBeDefined();
            });

            it("controller and vm should be configured", () => {
                expect($scope.vm).toBeDefined();
                expect($scope.vm.showDownloadCsv).toBeDefined();
                expect($scope.vm.tvAds).toBeDefined();
                expect($scope.vm.tvAds.length > 0).toBeTruthy();
                expect($scope.vm.tvReportCharts).toBeDefined();
                expect($scope.vm.tvReportCharts.impressionsGoal).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.charts.length).toEqual(29);
            });

            it("chartManager should work", () => {
                expect($scope.vm.tvReportCharts).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.charts.length > 0).toBeTruthy();
                expect($scope.vm.tvReportCharts.chartManager).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.filterChartSummaryVm.recordName).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.filterChartSummaryVm.group).toBeDefined();
            });

            it("keyMetricManager should work", () => {
                var fetchedKey: { id: string, title: string, shortFormatFunc: any, longFormatFunc: any,
                                  min?: any, max?: any, valueType: any, dimensionFunc: any, groupFunc: any };
                var fetchedMetric: { id: string, title: string, shortFormatFunc: any, longFormatFunc: any,
                                     valueFunc: any, reduceFunc: any, reduceWeightFunc: any };
                expect($scope.vm.tvReportCharts.chartManager.keyMetricManager).toBeDefined();
                fetchedKey = $scope.vm.tvReportCharts.chartManager.keyMetricManager.getKey("0");
                expect(fetchedKey.shortFormatFunc).toBeDefined();
                expect(fetchedKey.longFormatFunc).toBeDefined();
                expect(fetchedKey.valueType).toBeDefined();
                expect(fetchedKey.dimensionFunc).toBeDefined();
                expect(fetchedKey.groupFunc).toBeDefined();

                fetchedMetric = $scope.vm.tvReportCharts.chartManager.keyMetricManager.getMetric("0");
                expect(fetchedMetric.shortFormatFunc).toBeDefined();
                expect(fetchedMetric.longFormatFunc).toBeDefined();
                expect(fetchedMetric.valueFunc).toBeDefined();
                expect(fetchedMetric.reduceFunc).toBeDefined();
                expect(fetchedMetric.reduceWeightFunc).toBeDefined();

                expect($scope.vm.tvReportCharts.chartManager.keyMetricManager.addKey).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.keyMetricManager.addCloneKey).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.keyMetricManager).toBeDefined();
                expect($scope.vm.tvReportCharts.chartManager.keyMetricManager).toBeDefined();
                // expect($scope.vm.tvReportCharts.chartManager.keyMetricManager.keys.length === 11).toBeTruthy();
                // expect($scope.vm.tvReportCharts.chartManager.keyMetricManager.metrics.length === 8).toBeTruthy();
            });

            it("enums should be defined", () => {
                expect($scope.vm.enums).toBeDefined();
                expect($scope.vm.enums.chartName).toBeDefined();
                expect(Object.keys($scope.vm.enums.chartName).length > 0).toBeTruthy();
                expect($scope.vm.enums.chartGroupName).toBeDefined();
                expect(Object.keys($scope.vm.enums.chartGroupName).length > 0).toBeTruthy();
                expect(Object.keys($scope.vm.enums).indexOf("chartName") !== -1).toBeTruthy();
                expect(Object.keys($scope.vm.enums).indexOf("chartGroupName") !== -1).toBeTruthy();
            });

            it("ChartManager should create charts", () => {
                expect(_scope.vm.tvReportCharts.chartManager.charts[0].chartVm.dcOptions).toBeDefined();
                expect(_scope.vm.tvReportCharts.chartManager.charts[0].chartVm.chartBase.title).toBeDefined();
                expect(_scope.vm.tvReportCharts.chartManager.charts[0].chartVm.chartBase.title).toContain("float height");
            });
        });
    });
}

