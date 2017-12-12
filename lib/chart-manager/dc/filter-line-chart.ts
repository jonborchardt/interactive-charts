// FilterLineChart 
// a dc based chart with lines running across the xaxis
// https://tomneyland.github.io/angular-dc/example/stocks/nasdaq.html

// module InteractiveCharts.ChartManager.DcChart {
	"use strict";

	import {
		AbstractDcCoordinateGridChartViewModel,
		IAbstractDcCoordinateGridChart,
		IAbstractDcCoordinateGridChartViewModel
	} from "./abstract-dc-coordinate-grid-chart-view-model";

	import {
		IChartManager
	} from "../chart-manager";

	// chart def interface (contains data on how to build the chartViewModel)
	// extends IAbstractDcCoordinateGridChart which gives us xaxis, yaxis, brush, elastic, etc
	export interface IFilterLineChart<T> extends IAbstractDcCoordinateGridChart<T> {
		renderArea?: boolean;
		// add any additional options as we support them
	}


	// view model interface (the built chart) extends IAbstractDcCoordinateGridChartViewModel which gives us xaxis, yaxis, brush, elastic
	export interface IFilterLineChartViewModel<T> extends IAbstractDcCoordinateGridChartViewModel<T> {
		x: any; // expected to be a d3 scale domain
		y?: any; // expected to be a d3 scale domain
		renderArea?: boolean;
		// add any additional options as we support them
	}


	// view model class (use init to add most chart specific dc options)
	export class FilterLineChartViewModel<T> extends AbstractDcCoordinateGridChartViewModel<T> implements IFilterLineChartViewModel<T> {
		public x: any; // expected to be a d3 scale domain
		public y: any; // expected to be a d3 scale domain
		public renderArea: boolean;

		constructor(chartBase: IFilterLineChart<T>, chartManager: IChartManager<T>) {
			super(chartBase, chartManager);

			this.chartType = "lineChart";

			// save value to the viewmodel
			this.renderArea = chartBase.renderArea;

			super.init(
				(c: any) => {
					// can add additional class specific extensions here
					if (c.renderArea) {
						c.renderArea(this.renderArea);
					}
				}
			);

			// make other chart specific alterations after init
		}
	}
// }