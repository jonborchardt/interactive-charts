module Test {
    "use strict";

    describe("DC charts: directives should work", () => {
        var _compile: ng.ICompileService,
            $scope,
            charts,
            element,
            template;

        beforeEach(angular.mock.module("app"));

        beforeEach(inject(($rootScope, $compile, $controller) => {
            $scope = $rootScope.$new();
            _compile = $compile;

            $controller("appController", {
                $scope: $scope
            });
            $scope.$digest();
            charts = $scope.vm.tvReportCharts.chartManager.charts;
        }));

        afterEach(() => {
            $scope.$destroy();
        });

        // Dayparts: ChartManager.ChartType.filterRowChart
        it("dayparts: filter row chart config should be applied correctly", () => {
            var templateChartId: string;
            // render a new chart by using existing chartBase
            element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('7').chartVm.chartBase\"></adap-chart>");
            template = _compile(element)($scope);
            $scope.$digest();
            $scope.templateAsHtml = template;

            var barTextArr: { attributes: {x: string, y: string, dy: string }, textContent: string }[];
            var barArr: { attributes: {width: string, height: string, fill: string, transform: any } }[];
            var tickArr: { attributes: { class: string, style: string, transform: any } }[];

            // Top Markets: ChartManager.ChartType.filterRowChart, AbstractNvd3CoordinateGridChartViewModel
            templateChartId = "7";
            $scope.$apply(function() {
                var chartTitle: string = "103: DC Bar Chart";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            expect($scope.templateAsHtml.find("g")).toBeDefined();
            expect($scope.templateAsHtml.find("svg rect").length).toEqual(8);

            // test tick marks
            barTextArr = $scope.templateAsHtml.find("svg > g > .row text");
            expect(barTextArr[0].attributes).toBeDefined();
            expect(barTextArr[0].attributes.x).toBeDefined();
            expect(barTextArr[0].attributes.y).toBeDefined();
            expect(barTextArr[0].attributes.dy).toBeDefined();
            expect(barTextArr[0].textContent.toLowerCase()).toEqual("morning");

            // test tick labels
            tickArr = $scope.templateAsHtml.find("svg > g > .axis > .tick");
            expect(tickArr[0].attributes).toBeDefined();
            expect(tickArr[0].attributes.class).toBeDefined();
            expect(tickArr[0].attributes.style).toBeDefined();
            expect(tickArr[0].attributes.transform).toBeDefined();

            // test bars rendered
            barArr = $scope.templateAsHtml.find("svg > g > .row > rect");
            expect(barArr.length).toEqual(8);
            expect(barArr[0].attributes).toBeDefined();
            expect(barArr[0].attributes.width).toBeDefined();   // value
            expect(barArr[0].attributes.height).toBeDefined();
            expect(barArr[0].attributes.fill).toBeDefined();
        });

        // specifying whether to hide/show "0" as tick label should be enabled
        // applies to filterBarChart, filterRowChart, filterLineChart
        it("hideZeroTicks config should be applied correctly", () => {
            // TODO: un-hard-code chartTypes
            var chartTypes = [2, 3, 4], // filterBarChart, filterRowChart, filterLineChart
                tickArrX, tickArrY, tickLabelXAsNum, tickLabelYAsNum;

            for (var chart of $scope.vm.tvReportCharts.chartManager.charts) {
                if (chartTypes.indexOf(chart.chartType) !== -1) {
                    if (chart.hideZeroTicks === true) {
                        element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('" + chart.chartVm.id.toString()
                                                + "').chartVm.chartBase\"></adap-chart>");
                        template = _compile(element)($scope);
                        $scope.$digest();
                        $scope.templateAsHtml = template;

                        tickArrX = $scope.templateAsHtml.find("svg > g > .axis > .tick > text");
                        tickLabelXAsNum = parseInt(tickArrX[0].textContent.replace("$", ""), 10);
                        // exclude non-numerical lables from checking
                        if (!isNaN(tickLabelXAsNum)) {
                            expect(tickLabelXAsNum === 0).toBe(false);
                        }
                    }
                }
            }
        });
    });
}