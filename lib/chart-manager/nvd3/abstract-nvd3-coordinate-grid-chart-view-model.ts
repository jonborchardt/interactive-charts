// module InteractiveCharts.ChartManager.Nvd3Chart {
	"use strict";

    // import nv = InteractiveCharts.ChartManager.Nvd3Chart.Nvd3; // todo: remove once we have the real nvd3 interfaces
	import {
		AbstractNvd3ChartViewModelBase,
		IAbstractNvd3ChartBase,
		IAbstractNvd3ChartViewModelBase
	} from "./abstract-nvd3-chart-view-model-base";

	import {
		IChartManager
	} from "../chart-manager";

	// chart def interface for NVD3 charts that have xaxis, yaxis, etc... (contains data on how to build the chartViewModel)
	export interface IAbstractNvd3CoordinateGridChart<T> extends IAbstractNvd3ChartBase<T> {
		staggerLabels?: boolean;
		rotateLabels?: number;
		hideXAxis?: boolean;
		hideYAxis?: boolean;
		hideXAxisLabel?: boolean;
		hideYAxisLabel?: boolean;
		hideMaxMinY?: boolean;
		hideMaxMinX?: boolean;
		yAxisLabel?: string;
        yDomain1?: Array<number>;
        yDomain2?: Array<number>;
		useInteractiveGuideline?: boolean;
	}


// base view model class for NVD3 charts that have an xaxis, yaxis, brush, etc...
	// none of the properties should be altered (readonly is not supported by typescript yet)
	export interface IAbstractNvd3CoordinateGridChartViewModel<T> extends IAbstractNvd3ChartViewModelBase<T> {
		staggerLabels?: boolean;
		rotateLabels?: number;
		hideXAxis?: boolean;
		hideYAxis?: boolean;
		hideXAxisLabel?: boolean;
		hideYAxisLabel?: boolean;
		hideMaxMinY?: boolean;
		hideMaxMinX?: boolean;
		yAxisLabel?: string;
        yDomain1?: Array<number>;
        yDomain2?: Array<number>;
		useInteractiveGuideline?: boolean;
	}


	// base view model class for NVD3 charts that have an xaxis, yaxis, brush, etc...
	// none of the properties should be altered (readonly is not supported by typescript yet)
	export class AbstractNvd3CoordinateGridChartViewModel<T> extends AbstractNvd3ChartViewModelBase<T> implements IAbstractNvd3CoordinateGridChartViewModel<T> {

			public staggerLabels: boolean;
			public rotateLabels: number;
			public hideXAxis: boolean;
			public hideYAxis: boolean;
			public hideXAxisLabel: boolean;
			public hideYAxisLabel: boolean;
			public hideMaxMinY: boolean;
			public hideMaxMinX: boolean;
			public yAxisLabel: string;
            public yDomain1: Array<number>;
            public yDomain2: Array<number>;
			public useInteractiveGuideline: boolean;

			constructor(chartBase: IAbstractNvd3CoordinateGridChart<T>, chartManager: IChartManager<T>) {
				super(chartBase, chartManager);

				// hold on to values
				this.staggerLabels = chartBase.staggerLabels || false;
				this.rotateLabels = chartBase.rotateLabels || 0;
				this.hideXAxis = chartBase.hideXAxis || false;
				this.hideYAxis = chartBase.hideYAxis || false;
				this.hideXAxisLabel = chartBase.hideXAxisLabel || false;
				this.hideYAxisLabel = chartBase.hideYAxisLabel || false;
				this.hideMaxMinY = chartBase.hideMaxMinY || false;
				this.hideMaxMinX = chartBase.hideMaxMinX || false;
				this.yAxisLabel = chartBase.yAxisLabel || "";
				this.yDomain1 = chartBase.yDomain1 || undefined;
				this.yDomain2 = chartBase.yDomain2 || undefined;
				this.useInteractiveGuideline = chartBase.useInteractiveGuideline || false;
			}

			// init sets up the AbstractNvd3CoordinateGridChart data
			public init(initExtension: (c: any) => void) {
				super.init((c: any) => {
					// set values
					c.chart.showXAxis = !this.hideXAxis;
					c.chart.showYAxis = !this.hideYAxis;

					if (this.hideXAxisLabel) {
						c.chart.xAxis.axisLabel = "";
					}
					if (this.hideYAxisLabel) {
						c.chart.yAxis.axisLabel = "";
					}
					c.chart.xAxis.showMaxMin = !this.hideMaxMinX;
					c.chart.yAxis.showMaxMin = !this.hideMaxMinY;
					c.chart.useInteractiveGuideline = this.useInteractiveGuideline;
					c.chart.staggerLabels = this.staggerLabels;
					c.chart.xAxis.rotateLabels = this.rotateLabels;

					// then call chart specific extensions
					initExtension(c);
				});
			}
		}
// }