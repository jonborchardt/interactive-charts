// FilterBarChart
// a dc based chart with bars aligned across the xaxis
// https://tomneyland.github.io/angular-dc/example/stocks/nasdaq.html

// module InteractiveCharts.ChartManager.DcChart {
"use strict";

import "./interactive-dc-chart.tpl.html";
import "./interactive-filter-chart-summary.tpl.html"; // TODO: needed?
import "./dc-chart.less";

import {
	AbstractDcCoordinateGridChartViewModel,
	IAbstractDcCoordinateGridChart,
	IAbstractDcCoordinateGridChartViewModel
} from "./abstract-dc-coordinate-grid-chart-view-model";

import {
	IChartManager,
	ChartManager
} from "../chart-manager";

	// chart def interface (contains data on how to build the chartViewModel)
	// extends IAbstractDcCoordinateGridChart which gives us xaxis, yaxis, brush, elastic, etc
	export interface IFilterBarChart<T> extends IAbstractDcCoordinateGridChart<T> {
		// add any additional options as we support them
	}


	// view model interface (the built chart) extends IAbstractDcCoordinateGridChartViewModel which gives us xaxis, yaxis, brush, elastic
	export interface IFilterBarChartViewModel<T> extends IAbstractDcCoordinateGridChartViewModel<T> {
		// add any additional options as we support them
	}


	// view model class (use init to add most chart specific dc options)
	export class FilterBarChartViewModel<T> extends AbstractDcCoordinateGridChartViewModel<T> implements IFilterBarChartViewModel<T> {
		constructor(chartBase: IFilterBarChart<T>, chartManager: IChartManager<T>) {
			super(chartBase, chartManager);

			this.chartType = "barChart";

			super.init(
				(c: any) => {
					// can add additional class specific extensions here
				}
			);

			// make other chart specific alterations after init
		}
    }
// }