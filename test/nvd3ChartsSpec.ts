module Test {
    "use strict";

    describe("directives should work", () => {
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

        // Top Markets: ChartManager.ChartType.filterRowChart
        it("top markets: filter row chart config should be applied correctly", () => {
            var templateChartId: string;
            // render a new chart by using existing chartBase
            element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('26').chartVm.chartBase\"></adap-chart>");
            template = _compile(element)($scope);
            $scope.$digest();
            $scope.templateAsHtml = template;

            var barTextArr: { attributes: {x: string, y: string, dy: string }, textContent: string }[];
            var barArr: { attributes: {width: string, height: string, fill: string, class: string } }[];
            var tickArr: { attributes: { class: string, style: string, transform: any } }[];

            // Top Markets: ChartManager.ChartType.filterRowChart, AbstractNvd3CoordinateGridChartViewModel
            templateChartId = "26";
            $scope.$apply(function() {
                var chartTitle: string = "101: Nvd3 Bar Chart";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            expect($scope.templateAsHtml.find("g")).toBeDefined();
            expect($scope.templateAsHtml.find("svg rect").length).toEqual(7);

            barTextArr = $scope.templateAsHtml.find("svg > g > .row text");
            expect(barTextArr[0].attributes).toBeDefined();
            expect(barTextArr[0].attributes.x).toBeDefined();
            expect(barTextArr[0].attributes.y).toBeDefined();
            expect(barTextArr[0].attributes.dy).toBeDefined();
            expect(barTextArr[0].textContent.toLowerCase()).toEqual("national");

            tickArr = $scope.templateAsHtml.find("svg > g > .axis > .tick");
            expect(tickArr[0].attributes).toBeDefined();
            expect(tickArr[0].attributes.class).toBeDefined();
            expect(tickArr[0].attributes.style).toBeDefined();
            expect(tickArr[0].attributes.transform).toBeDefined();

            barArr = $scope.templateAsHtml.find("svg > g > .row > rect");
            expect(barArr[0].attributes).toBeDefined();
            expect(barArr[0].attributes).toBeDefined();
            expect(barArr[0].attributes.width).toBeDefined();
            expect(barArr[0].attributes.height).toBeDefined();
            expect(barArr[0].attributes.fill).toBeDefined();
            expect(barArr[0].attributes.class).toBeDefined();
        });

        // Web Spike Example: ChartManager.IMultiChart, IMultiChartViewModel
        it("web spike Example: multichart config should be applied correctly", () => {
            var templateChartId: string  = "28";
            var boxArr: { attributes: {x: string, y: string, height: string, width: string, transform: any, fill: string, class: string } }[];
            var barArr: { attributes: {x: string, y: string, height: string, width: string, transform: any, fill: string, class: string } }[];
            element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('28').chartVm.chartBase\"></adap-chart>");
            template = _compile(element)($scope);
            $scope.$digest();
            $scope.templateAsHtml = template;

            $scope.$apply(function() {
                var chartTitle: string = "102: Nvd3 Multi Chart";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            boxArr = $scope.templateAsHtml.find("svg .nv-barsWrap .nv-bars rect");
            expect($scope.templateAsHtml.find("g")).toBeDefined();
            expect(boxArr[0].attributes).toBeDefined();
            expect(boxArr[0].attributes.x).toBeDefined();
            expect(boxArr[0].attributes.y).toBeDefined();
            expect(boxArr[0].attributes.height).toBeDefined();
            expect(boxArr[0].attributes.width).toBeDefined();
            expect(boxArr[0].attributes.transform).toBeDefined();
            expect(boxArr[0].attributes.fill).toBeDefined();
            expect(boxArr[0].attributes.class).toBeDefined();

            barArr = $scope.templateAsHtml.find("svg .nv-barsWrap .nv-bars rect");
            expect($scope.templateAsHtml.find("g")).toBeDefined();
            expect(barArr[0].attributes).toBeDefined();
            expect(barArr[0].attributes.x).toBeDefined();
            expect(barArr[0].attributes.y).toBeDefined();
            expect(barArr[0].attributes.height).toBeDefined();
            expect(barArr[0].attributes.width).toBeDefined();
            expect(barArr[0].attributes.transform).toBeDefined();
            expect(barArr[0].attributes.fill).toBeDefined();
            expect(barArr[0].attributes.class).toBeDefined();

            expect(boxArr.length).toEqual(barArr.length);
        });

        // specifying whether to hide/show "0" as tick label should be enabled
        // applies to discreteBarChart, multiBarChart, stackedAreaChart, lineChart, multiChart
        it("hideZeroTicks config should be applied correctly", () => {
            // TODO: un-hard-code chartTypes
            var chartTypes = [6, 7, 8, 10, 12], // discreteBarChart, multiBarChart, stackedAreaChart, lineChart, multiChart
                tickArrX, tickArrY, tickLabelXAsNum, tickLabelYAsNum;

            for (var chart of $scope.vm.tvReportCharts.chartManager.charts) {
                if (chartTypes.indexOf(chart.chartType) !== -1) {
                    if (chart.hideZeroTicks === true) {
                        element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('" + chart.chartVm.id.toString()
                                                + "').chartVm.chartBase\"></adap-chart>");
                        template = _compile(element)($scope);
                        $scope.$digest();
                        $scope.templateAsHtml = template;

                        tickArrX = $scope.templateAsHtml.find("svg > g .nv-x .tick > text");
                        tickLabelXAsNum = parseInt(tickArrX[0].textContent.replace("$", ""), 10);
                        if (!isNaN(tickLabelXAsNum)) {
                            expect(tickLabelXAsNum === 0).toBe(false);
                        }

                        // exclude chartTypes (stackedAreaChart and multiChart) that do not have ticks on .nv-y
                        if (chart.chartType !== 8 && chart.chartType !== 12) {
                            tickArrY = $scope.templateAsHtml.find("svg > g .nv-y .tick > text");
                            tickLabelYAsNum = parseInt(tickArrX[0].textContent.replace("$", ""), 10);
                            if (!isNaN(tickLabelYAsNum)) {
                                expect(tickLabelYAsNum === 0).toBe(false);
                            }
                        }
                    }
                }
            }
        });


        // pieChart: apply orderFunc to enable sorting slices by 
        it("pieChart ordering should be applied correctly", () => {
            var templateChartId: string;
            // render a new chart by using existing chartBase
            element = angular.element("<adap-chart chart=\"vm.tvReportCharts.chartManager.getChart('9').chartVm.chartBase\"></adap-chart>");
            template = _compile(element)($scope);
            $scope.$digest();
            $scope.templateAsHtml = template;

            var labelsArr: { attributes: { style: string }, textContent: string }[];
            var orderFuncs = [
                {
                    name: "Daypart",
                    func: (groups: CrossFilter.Grouping<any, any>[]): any => {
                        return groups.sort((a: any, b: any) => { return a.key > b.key ? 1 : 0; });
                    }
                },
                {
                    name: "Ascending",
                    func: (groups: CrossFilter.Grouping<any, any>[]): any => {
                        var valueFunc: any = (p: any) => {
                            return p.value;
                        };
                        return groups.sort((a: any, b: any) => { return valueFunc(a) - valueFunc(b); });
                    }
                },
                {
                    name: "Descending",
                    func: (groups: CrossFilter.Grouping<any, any>[]): any => {
                        var valueFunc: any = (p: any) => {
                            return p.value;
                        };
                        return groups.sort((a: any, b: any) => { return valueFunc(b) - valueFunc(a); });
                    }
               }
            ];

            $scope.$apply(function() {
                var chartTitle: string = "Nvd3 pieChart test descending";
                templateChartId = $scope.vm.enums.chartName["ImpressionsActualPerDaypart"];
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            // # slices should equal # labels
            expect($scope.templateAsHtml.find("svg .nv-slice").length).toEqual($scope.templateAsHtml.find("svg .nv-pieLabels > .nv-label").length);
            labelsArr = $scope.templateAsHtml.find("svg .nv-pieLabels > .nv-label > text");
            var max: number = 101,
                currentValStr: string,
                currentVal: number;

            labelsArr.map((elem: any) => {
                currentValStr = labelsArr[elem].textContent.substring(labelsArr[elem].textContent.indexOf("-") + 1, labelsArr[elem].textContent.indexOf("%")).trim();
                currentVal = (currentValStr.length) ? parseFloat(currentValStr) : 0.0;
                // set to decreasing order: value should be smaller than the previous one
                expect(max >= currentVal).toBeTruthy();
                max = currentVal;
            });

            // set ordering to increasing
            $scope.$apply(function() {
                var chartTitle: string = "Nvd3 pieChart test ascending";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                chartBase.orderFunc = orderFuncs[1];
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            // # slices should equal # labels
            expect($scope.templateAsHtml.find("svg .nv-slice").length).toEqual($scope.templateAsHtml.find("svg .nv-pieLabels > .nv-label").length);
            labelsArr = $scope.templateAsHtml.find("svg .nv-pieLabels > .nv-label > text");

            var min = -1;
            labelsArr.map((elem: any) => {
                currentValStr = labelsArr[elem].textContent.substring(labelsArr[elem].textContent.indexOf("-") + 1, labelsArr[elem].textContent.indexOf("%")).trim();
                currentVal = (currentValStr.length) ? parseFloat(currentValStr) : 0.0;
                // set to increasing order: value should be greater than the previous one
                expect(min <= currentVal).toBeTruthy();
                min = currentVal;
            });

            // maxPartsCount should be applied correctly
            $scope.$apply(function() {
                var chartTitle: string = "Nvd3 pieChart test maxPartsCount";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                chartBase.orderFunc = orderFuncs[2];
                chartBase.maxPartsCount = 4;
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            // # slices should equal maxPartsCount + 1 for "other"
            expect($scope.templateAsHtml.find("svg .nv-slice").length).toEqual(5);

            // TODO: put in a loop
            // maxPartsCount should be applied correctly
            $scope.$apply(function() {
                var chartTitle: string = "Nvd3 pieChart test maxPartsCount 3+1";
                var chartBase = $scope.vm.tvReportCharts.chartManager.getChart(templateChartId);
                chartBase.orderFunc = orderFuncs[2];
                chartBase.maxPartsCount = 3;
                $scope.vm.tvReportCharts.chartManager.addChart(chartTitle, chartBase);
            });

            // # slices should equal maxPartsCount + 1 for "other"
            expect($scope.templateAsHtml.find("svg .nv-slice").length).toEqual(4);
        });
    });
}
