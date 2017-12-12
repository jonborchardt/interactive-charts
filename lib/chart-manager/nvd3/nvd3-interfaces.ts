// module InteractiveCharts.ChartManager.Nvd3Chart.Nvd3 { // todo: remove once we have the real nvd3 interfaces
"use strict";

// export = nvd3;

	// quick and dirty typescript interfaces for nvd3 by Jon Borchardt @ aol 2015
// declare module nvd3 {
	export interface IPosition {
		top?: number;
		right?: number;
	}

	export interface IMargin extends IPosition {
		bottom?: number;
		left?: number;
	}

	export interface IArcRadius {
		inner?: number;
		outer?: number;
	}

	export interface IControlLabels {
		stacked?: string;
		stream?: string;
		grouped?: string;
		expanded?: string;
	}

	export interface IAnyToNumberFunc {
		(d: any): number;
	}

	export interface IAnyWithIndexToNumberFunc {
		(d: any, i: number): number;
	}

	export interface IAnyToBoolFunc {
		(d: any): boolean;
	}

	export interface IAnyWithIndexToBoolFunc {
		(d: any, i: number): boolean;
	}

	export interface IAnyToAnyFunc {
		(d: any): any/*string or number*/;
	}

	export interface IAnyToStringFunc {
		(d: any): string;
	}

	export interface INvd3Options {
		chart: IBaseChart;
		title?: ITitle;
		subtitle?: ISubtitle;
		caption?: ICaption;
		styles?: IStyles;
	}

	export interface IBaseChart {
		width?: number;
		height?: number;
		margin?: IMargin;
		type: string;
		noData?: string;
	}

	export interface ITitle {
		enable?: boolean;
		text: string;
		css?: ICss;
	}

	export interface ISubtitle {
		enable?: boolean;
		text: string;
		css?: ICss;
	}

	export interface ICaption {
		enable?: boolean;
		text: string;
		css?: ICss;
		html?: string;
	}

	export interface IStyles {
		classes?: IClasses;
		css?: ICss;
	}

	export interface ICss {
		width?: string;
		textAlign?: string;
		margin?: string;
	}

	export interface IClasses {
		gallery?: boolean;
	}

	export interface INvd3Data {
		key: string;
		value?: number;
		values?: any[];
	}

	export interface IExtendedNvd3Data extends INvd3Data {
		index?: number;
		values?: any[];
	}

	export interface INvd3SingleSeriesData extends INvd3Data {
		value: number;
	}

	export interface INvd3MultiSeriesData extends INvd3Data {
		values: any[];
	}

	export interface INvd3MultiChartSeriesData extends INvd3MultiSeriesData {
		yAxis: number;
		type: string;
		color: string;
	}

	export interface IControls {
		width: number;
		height: number;
		align: boolean;
		rightAlign: boolean;
		padding: number;
		updateState: boolean;
		radioButtonMode: boolean;
		expanded: boolean;
		vers: string;
		margin: IMargin;
	}

	export interface IAxis {
		// No Description.
		axisLabel?: any;

		// No Description.
		axisLabelDistance?: any;

		// No Description.
		domain?: any; // inherited from D3

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		orient?: any; // inherited from D3

		// No Description.
		range?: any; // inherited from D3

		// No Description.
		rangeBand?: any; // inherited from D3

		// No Description.
		rangeBands?: any; // inherited from D3

		/*
		Description: Rotates the X axis labels by the specified degree.
		Default: 0
		Example(s):
			chart.rotateLabels(90)
			chart.rotateLabels(-45)
		*/
		rotateLabels?: number;

		// No Description.
		rotateYLabel?: any;

		// No Description.
		scale?: any;

		// No Description.
		showMaxMin?: any;

		/*
		Description: Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
		Default: false
		Example(s):
			chart.staggerLabels(true)
		*/
		staggerLabels?: boolean;

		// No Description.
		tickFormat?: any; // inherited from D3

		// No Description.
		tickPadding?: any; // inherited from D3

		// No Description.
		tickSize?: any; // inherited from D3

		// No Description.
		tickSubdivide?: any; // inherited from D3

		// No Description.
		tickValues?: any; // inherited from D3

		// No Description.
		ticks?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface IBoxPlot extends IBaseChart {
		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		maxBoxWidth?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IBullet extends IBaseChart {
		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		markers?: any;

		// No Description.
		measures?: any;

		// No Description.
		orient?: any;

		// No Description.
		ranges?: any;

		// No Description.
		tickFormat?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface ICandlestickBar extends IBaseChart {
		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		// No Description.
		close?: any;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[];

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		high?: any;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean;

		// No Description.
		low?: any;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		open?: any;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IDiscreteBar extends IBaseChart {
		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		rectClass?: any;

		/*
		Description: Prints the Y values on the top of the bars.  Only recommended to use if there aren't many bars.
		Default: false
		Example(s):
			chart.showValues(true)
		*/
		showValues?: boolean;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IHistoricalBar extends IBaseChart {
		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[];

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface ILegend extends IBaseChart {
		// No Description.
		align?: any;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		// No Description.
		expanded?: any;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		key?: any;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Specifies how much spacing there is between legend items.
		Default: 28
		Example(s):
			chart.padding("40")
		*/
		padding?: string;

		// No Description.
		radioButtonMode?: any;

		// No Description.
		rightAlign?: any;

		// No Description.
		updateState?: any;

		// No Description.
		vers?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface ILine extends IBaseChart {
		// Subcomponents:
		scatter?: IScatter;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: A provided function that allows a line to be non-continuous when not defined.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined
		Default: function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }
		Example(s):
			chart.defined(function (d, i) {
        // returns false if Y value is non-numeric or null
        return true; // !isNaN(getY(d, i)) && getY(d, i) !== null;
    })
		*/
		defined?: IAnyWithIndexToBoolFunc;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string;

		/*
		Description: Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the line's definition in data.  If a
			 non-function is given, it the value is used for all lines.
		Default: function(d) { return d.area }
		Example(s):
			chart.isArea(true)
			chart.isArea(function (d) {
        return !!d.myCustomAttribute;
    })
		*/
		isArea?: any /* boolean or function */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IMultiBar extends IBaseChart {
		/*
		Description: For bar charts, the "color" option makes each bar a different color.  For multibar, this option lets you specific a color for each bar group to have t
			he same color but differentiated by shading.
		Default: Not Enabled
		Example(s):
			chart.barColor(["#FF0000","#00FF00","#0000FF"])
			chart.barColor(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		barColor?: any /* array or function */;

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		// No Description.
		disabled?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The padding between bar groups, this is passed as the padding attribute of rangeBands
			https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands
		Default: 0.1
		Example(s):
			chart.groupSpacing(0.5)
		*/
		groupSpacing?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		hideable?: any;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		stackOffset?: any;

		// No Description.
		stacked?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IMultiBarHorizontal extends IBaseChart {
		/*
		Description: For bar charts, the "color" option makes each bar a different color.  For multibar, this option lets you specific a color for each bar group to have t
			he same color but differentiated by shading.
		Default: Not Enabled
		Example(s):
			chart.barColor(["#FF0000","#00FF00","#0000FF"])
			chart.barColor(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		barColor?: any /* array or function */;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		// No Description.
		disabled?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The padding between bar groups, this is passed as the padding attribute of rangeBands
			https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands
		Default: 0.1
		Example(s):
			chart.groupSpacing(0.5)
		*/
		groupSpacing?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Prints the Y values on the top of the bars.  Only recommended to use if there aren't many bars.
		Default: false
		Example(s):
			chart.showValues(true)
		*/
		showValues?: boolean;

		// No Description.
		stacked?: any;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any;

		// No Description.
		valuePadding?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		// No Description.
		yErr?: any;

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IOhlcBar extends IBaseChart {
		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		// No Description.
		close?: any;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[];

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		high?: any;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean;

		// No Description.
		low?: any;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		open?: any;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface IPie extends IBaseChart {
		/*
		Description: Specifies each slice size, by an inner and a outer radius. Values between 0 and 1.
		Default: [{inner: donutRatio, outer: 1}]
		Example(s):
			chart.arcsRadius({"inner":0.6,"outer":0.8})
		*/
		arcsRadius?: IArcRadius;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: D3 3.4+, For donut charts only, the corner radius of the slices.  Typically used with padAngle.
		Default: 0
		Example(s):
			chart.cornerRadius(3)
		*/
		cornerRadius?: number;

		/*
		Description: Whether to make a pie graph a donut graph or not.
		Default: false
		Example(s):
			chart.donut(true)
		*/
		donut?: boolean;

		// No Description.
		donutLabelsOutside?: any;

		/*
		Description: Percent of pie radius to cut out of the middle to make the donut.  It is multiplied by the outer radius to calculate the inner radius, thus it should
			be between 0 and 1.
		Default: 0.5
		Example(s):
			chart.donutRatio(0.75)
		*/
		donutRatio?: number;

		/*
		Description: Function used to manage the ending angle of the pie/donut chart
		Default: Ignored unless set
		Example(s):
			chart.endAngle(function (d) {
        return d.endAngle / 2 - Math.PI / 2;
    })
		*/
		endAngle?: IAnyToNumberFunc;

		/*
		Description: For pie/donut charts, whether to increase slice radius on hover or not
		Default: true
		Example(s):
			chart.growOnHover(true)
		*/
		growOnHover?: boolean;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		// No Description.
		labelFormat?: any;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.labelSunbeamLayout(true)
		*/
		labelSunbeamLayout?: boolean;

		/*
		Description: Pie/donut charts: The slice threshold size to not display the label because it woudl be too small of a space
		Default: 0.02
		Example(s):
			chart.labelThreshold(0.05)
		*/
		labelThreshold?: number;

		/*
		Description: pie/donut charts only: what kind of data to display for the slice labels.  Options are key, value, or percent.
		Default: key
		Example(s):
			chart.labelType("key")
			chart.labelType("value")
			chart.labelType("percent")
		*/
		labelType?: string;

		/*
		Description: Whether pie/donut chart labels should be outside the slices instead of inside them
		Default: true
		Example(s):
			chart.labelsOutside(true)
		*/
		labelsOutside?: boolean;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: D3 3.4+, For donut charts only, the percent of the chart that should be spacing between slices.
		Default: 0
		Example(s):
			chart.padAngle(0.05)
		*/
		padAngle?: number;

		// No Description.
		pieLabelsOutside?: any;

		/*
		Description: Show pie/donut chart labels for each slice
		Default: true
		Example(s):
			chart.showLabels(true)
		*/
		showLabels?: boolean;

		/*
		Description: Function used to manage the starting angle of the pie/donut chart
		Default: Ignored unless set
		Example(s):
			chart.startAngle(function (d) {
        return d.startAngle / 2 - Math.PI / 2;
    })
		*/
		startAngle?: IAnyToNumberFunc;

		/*
		Description: Text to include within the middle of a donut chart
		Default: Blank String
		Example(s):
			chart.title("Customers")
		*/
		title?: string;

		/*
		Description: Vertical offset for the donut chart title
		Example(s):
			chart.titleOffset(-10)
			chart.titleOffset(23)
		*/
		titleOffset?: number;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

	}



	export interface IScatter extends IBaseChart {
		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean;

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */;

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[];

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[];

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean;

		// No Description.
		padDataOuter?: any;

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc;

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[];

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[];

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any;

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */;

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface ISparkline extends IBaseChart {
		// No Description.
		animate?: any;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[];

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[];

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[];

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[];

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any;

	}



	export interface ISunburst extends IBaseChart {
		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: For sunburst only: specifies the mode of drawing the sunburst segments. Can be "size" or "count". "size" draws the segments according to the "size" at
			tribute of the leaf nodes, "count" draws according to the amount of siblings a node has.
			http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad
		Default: count
		Example(s):
			chart.mode("size")
		*/
		mode?: string;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface ITooltip extends IBaseChart {
		/*
		Description: For tooltip: Parent dom element of the SVG that holds the chart.  This will make the tooltip dom be created inside this container instead of on the do
			cument body.
		Default: null
		*/
		chartContainer?: any;

		// No Description.
		classes?: any;

		/*
		Description: For tooltip: Function that generates the tooltip content html.  This replaces the "tooltipContent" option that was on most charts.  Please note that t
			he data passed this function is usually different depending on the chart, so you'll probably need to console.log() the input object.  Also, the data p
			assed is always a single object now, so previous functions written for the tooltipContent option will have to be adjusted accordingly.
		Default: See contentGenerator function in tooltip.js
		Example(s):
			chart.tooltip.contentGenerator(function (obj) {
    return JSON.stringify(obj);
})
		*/
		contentGenerator?: IAnyToStringFunc;

		// No Description.
		data?: any;

		// No Description.
		distance?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: For tooltip: completely enables or disabled the tooltip
		Default: true
		Example(s):
			chart.tooltip.enabled(false)
		*/
		enabled?: boolean;

		/*
		Description: For tooltip: If not null, this fixes the top position of the tooltip.
		Default: null
		Example(s):
			chart.tooltip.fixedTop(50)
		*/
		fixedTop?: number;

		/*
		Description: Can be "n","s","e","w". Determines how tooltip is positioned.
		Default: w
		Example(s):
			chart.tooltip.gravity("n")
		*/
		gravity?: string;

		/*
		Description: For tooltip: show the x axis value in the tooltip or not (not valid for pie charts for instance)
		Default: true
		Example(s):
			chart.tooltip.headerEnabled(false)
		*/
		headerEnabled?: boolean;

		/*
		Description: For tooltip: formats the x axis value in the tooltip
		Default: Uses the xAxis' tickFormat() option
		Example(s):
			chart.tooltip.headerFormatter(function (d) {
    return d + " monkeys";
})
		*/
		headerFormatter?: IAnyToStringFunc;

		/*
		Description: For tooltip: show or hide the tooltip by setting this to true or false.  Tooltips used to be created and destroyed, but now we re-used the element and
			 set opacity to 1 or 0.
		Default: false
		Example(s):
			chart.tooltip.hidden(true)
		*/
		hidden?: boolean;

		/*
		Description: Delay in ms before the tooltip hides itself after a mouseout event.  A new mouseover event cancels the hide if within this timeout period.
		Default: 400
		Example(s):
			chart.tooltip.hideDelay(200)
		*/
		hideDelay?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */;

		// No Description.
		keyFormatter?: any;

		// No Description.
		offset?: any;

		/*
		Description: For tooltip: sets the top/left positioning for the tooltip.  Should be given an object with "left" and/or "top" attributes.  You can override just one
			, just like the "margin" option on charts.
		Default: Starts off with {top: 0, left: 0}
		Example(s):
			chart.tooltip.position({"top":200,"left":300})
			chart.tooltip.position({"left":50})
		*/
		position?: IPosition;

		/*
		Description: Tolerance allowed before tooltip is moved from its current position (creates "snapping" effect)
		Default: 0
		Example(s):
			chart.tooltip.snapDistance(10)
		*/
		snapDistance?: number;

		/*
		Description: For tooltip: returns the dom element of the tooltip.  This is read-only, you cannot set this value.
		*/
		tooltipElem?: any;

		/*
		Description: For tooltip: formats the y axis value(s) in the tooltip
		Default: Uses the yAxis' tickFormat() option
		Example(s):
			chart.tooltip.valueFormatter(function (d) {
    return d > 0 ? d : 0;
})
		*/
		valueFormatter?: IAnyToAnyFunc;

	}



	export interface IBoxPlotChart extends IBaseChart {
		// Subcomponents:
		boxplot?: IBoxPlot;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		outlierValue: (d, i, j) => number;
		outlierLabel: (d, i, j) => string;
		outlierColor: (d, i, j) => string;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		maxBoxWidth?: any; // inherited

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
		Default: false
		Example(s):
			chart.staggerLabels(true)
		*/
		staggerLabels?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IBulletChart extends IBaseChart {
		// Subcomponents:
		bullet?: IBullet;
		tooltip?: ITooltip;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		// No Description.
		markers?: any;

		// No Description.
		measures?: any;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		orient?: any;

		// No Description.
		ranges?: any;

		// No Description.
		tickFormat?: any;

		// No Description.
		ticks?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface ICandlestickBarChart extends IBaseChart {
		// Subcomponents:
		bars?: ICandlestickBar;
		legend?: ILegend;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		// No Description.
		close?: any; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		high?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		// No Description.
		low?: any; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		open?: any; // inherited

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ICumulativeLineChart extends IBaseChart {
		// Subcomponents:
		lines?: ILine;
		legend?: ILegend;
		controls?: IControls;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		average?: any;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: A provided function that allows a line to be non-continuous when not defined.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined
		Default: function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }
		Example(s):
			chart.defined(function (d, i) {
        // returns false if Y value is non-numeric or null
        return true; // !isNaN(getY(d, i)) && getY(d, i) !== null;
    })
		*/
		defined?: IAnyWithIndexToBoolFunc; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string; // inherited

		/*
		Description: Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the line's definition in data.  If a
			 non-function is given, it the value is used for all lines.
		Default: function(d) { return d.area }
		Example(s):
			chart.isArea(true)
			chart.isArea(function (d) {
        return !!d.myCustomAttribute;
    })
		*/
		isArea?: any /* boolean or function */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		noErrorCheck?: any;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		// No Description.
		rescaleY?: any;

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to show extra controls or not.  Extra controls include things like making mulitBar charts stacked or side by side.
		Default: true
		Example(s):
			chart.showControls(true)
		*/
		showControls?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IDiscreteBarChart extends IBaseChart {
		// Subcomponents:
		discretebar?: IDiscreteBar;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		rectClass?: any; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Prints the Y values on the top of the bars.  Only recommended to use if there aren't many bars.
		Default: false
		Example(s):
			chart.showValues(true)
		*/
		showValues?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
		Default: false
		Example(s):
			chart.staggerLabels(true)
		*/
		staggerLabels?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IHistoricalBarChart extends IBaseChart {
		// Subcomponents:
		bars?: IHistoricalBar;
		legend?: ILegend;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ILineChart extends IBaseChart {
		// Subcomponents:
		lines?: ILine;
		legend?: ILegend;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: A provided function that allows a line to be non-continuous when not defined.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined
		Default: function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }
		Example(s):
			chart.defined(function (d, i) {
        // returns false if Y value is non-numeric or null
        return true; // !isNaN(getY(d, i)) && getY(d, i) !== null;
    })
		*/
		defined?: IAnyWithIndexToBoolFunc; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string; // inherited

		/*
		Description: Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the line's definition in data.  If a
			 non-function is given, it the value is used for all lines.
		Default: function(d) { return d.area }
		Example(s):
			chart.isArea(true)
			chart.isArea(function (d) {
        return !!d.myCustomAttribute;
    })
		*/
		isArea?: any /* boolean or function */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ILinePlusBarChart extends IBaseChart {
		// Subcomponents:
		legend?: ILegend;
		lines?: ILine;
		lines2?: ILine;
		bars?: IHistoricalBar;
		bars2?: IHistoricalBar;
		xAxis?: IAxis;
		x2Axis?: IAxis;
		y1Axis?: IAxis;
		y2Axis?: IAxis;
		y3Axis?: IAxis;
		y4Axis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		brushExtent?: any;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: A provided function that allows a line to be non-continuous when not defined.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined
		Default: function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }
		Example(s):
			chart.defined(function (d, i) {
        // returns false if Y value is non-numeric or null
        return true; // !isNaN(getY(d, i)) && getY(d, i) !== null;
    })
		*/
		defined?: IAnyWithIndexToBoolFunc; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		// No Description.
		focusEnable?: any;

		// No Description.
		focusHeight?: any;

		// No Description.
		focusShowAxisX?: any;

		// No Description.
		focusShowAxisY?: any;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string; // inherited

		/*
		Description: Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the line's definition in data.  If a
			 non-function is given, it the value is used for all lines.
		Default: function(d) { return d.area }
		Example(s):
			chart.isArea(true)
			chart.isArea(function (d) {
        return !!d.myCustomAttribute;
    })
		*/
		isArea?: any /* boolean or function */; // inherited

		/*
		Description: The extra text after the label in the legend that tells what axis the series belongs to, for any series on the left axis.
		Default:  (left axis)
		Example(s):
			chart.legendLeftAxisHint(" (L)")
			chart.legendLeftAxisHint(" [LEFT]")
		*/
		legendLeftAxisHint?: string;

		/*
		Description: The extra text after the label in the legend that tells what axis the series belongs to, for any seris on the right axis.
		Default:  (right axis)
		Example(s):
			chart.legendRightAxisHint(" (R)")
			chart.legendRightAxisHint(" [RIGHT]")
		*/
		legendRightAxisHint?: string;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ILineWithFocusChart extends IBaseChart {
		// Subcomponents:
		legend?: ILegend;
		lines?: ILine;
		lines2?: ILine;
		xAxis?: IAxis;
		yAxis?: IAxis;
		x2Axis?: IAxis;
		y2Axis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		brushExtent?: any;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: A provided function that allows a line to be non-continuous when not defined.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined
		Default: function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }
		Example(s):
			chart.defined(function (d, i) {
        // returns false if Y value is non-numeric or null
        return true; // !isNaN(getY(d, i)) && getY(d, i) !== null;
    })
		*/
		defined?: IAnyWithIndexToBoolFunc; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		// No Description.
		focusHeight?: any;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string;

		/*
		Description: Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the line's definition in data.  If a
			 non-function is given, it the value is used for all lines.
		Default: function(d) { return d.area }
		Example(s):
			chart.isArea(true)
			chart.isArea(function (d) {
        return !!d.myCustomAttribute;
    })
		*/
		isArea?: any /* boolean or function */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		// No Description.
		xTickFormat?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

		// No Description.
		yTickFormat?: any;

	}



	export interface IMultiBarChart extends IBaseChart {
		// Subcomponents:
		multibar?: IMultiBar;
		legend?: ILegend;
		controls?: IControls;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: For bar charts, the "color" option makes each bar a different color.  For multibar, this option lets you specific a color for each bar group to have t
			he same color but differentiated by shading.
		Default: Not Enabled
		Example(s):
			chart.barColor(["#FF0000","#00FF00","#0000FF"])
			chart.barColor(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		barColor?: any /* array or function */;

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Object that defines the labels for control items in the graph.  For instance, in the stackedAreaChart, there are controls for making it stacked, expan
			ded, or stream.  For stacked bar charts, there is stacked and grouped.
		Default: Depends on chart type
		Example(s):
			chart.controlLabels({"stacked":"Stack It","stream":"Stream dat","expanded":"Xpand"})
			chart.controlLabels({"grouped":"Group em","stacked":"Stack em"})
		*/
		controlLabels?: IControlLabels;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		// No Description.
		disabled?: any; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The padding between bar groups, this is passed as the padding attribute of rangeBands
			https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands
		Default: 0.1
		Example(s):
			chart.groupSpacing(0.5)
		*/
		groupSpacing?: number; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		hideable?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		reduceXTicks?: any;

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Rotates the X axis labels by the specified degree.
		Default: 0
		Example(s):
			chart.rotateLabels(90)
			chart.rotateLabels(-45)
		*/
		rotateLabels?: number;

		/*
		Description: Whether to show extra controls or not.  Extra controls include things like making mulitBar charts stacked or side by side.
		Default: true
		Example(s):
			chart.showControls(true)
		*/
		showControls?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		// No Description.
		stackOffset?: any; // inherited

		// No Description.
		stacked?: any; // inherited

		/*
		Description: Makes the X labels stagger at different distances from the axis so they're less likely to overlap.
		Default: false
		Example(s):
			chart.staggerLabels(true)
		*/
		staggerLabels?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IMultiBarHorizontalChart extends IBaseChart {
		// Subcomponents:
		multibar?: IMultiBar;
		legend?: ILegend;
		controls?: IControls;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: For bar charts, the "color" option makes each bar a different color.  For multibar, this option lets you specific a color for each bar group to have t
			he same color but differentiated by shading.
		Default: Not Enabled
		Example(s):
			chart.barColor(["#FF0000","#00FF00","#0000FF"])
			chart.barColor(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		barColor?: any /* array or function */;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Object that defines the labels for control items in the graph.  For instance, in the stackedAreaChart, there are controls for making it stacked, expan
			ded, or stream.  For stacked bar charts, there is stacked and grouped.
		Default: Depends on chart type
		Example(s):
			chart.controlLabels({"stacked":"Stack It","stream":"Stream dat","expanded":"Xpand"})
			chart.controlLabels({"grouped":"Group em","stacked":"Stack em"})
		*/
		controlLabels?: IControlLabels;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		// No Description.
		disabled?: any; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The padding between bar groups, this is passed as the padding attribute of rangeBands
			https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands
		Default: 0.1
		Example(s):
			chart.groupSpacing(0.5)
		*/
		groupSpacing?: number; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: Whether to show extra controls or not.  Extra controls include things like making mulitBar charts stacked or side by side.
		Default: true
		Example(s):
			chart.showControls(true)
		*/
		showControls?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Prints the Y values on the top of the bars.  Only recommended to use if there aren't many bars.
		Default: false
		Example(s):
			chart.showValues(true)
		*/
		showValues?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		// No Description.
		stacked?: any; // inherited

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any; // inherited

		// No Description.
		valuePadding?: any; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		// No Description.
		yErr?: any; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IMultiChart extends IBaseChart {
		// Subcomponents:
		lines1?: ILine;
		lines2?: ILine;
		bars1?: IMultiBar;
		bars2?: IMultiBar;
		stack1?: ILine;
		stack2?: ILine;
		xAxis?: IAxis;
		yAxis1?: IAxis;
		yAxis2?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc;

		// No Description.
		yDomain1?: any;

		// No Description.
		yDomain2?: any;

	}



	export interface IOhlcBarChart extends IBaseChart {
		// Subcomponents:
		bars?: IOhlcBar;
		legend?: ILegend;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		// No Description.
		close?: any; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		high?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		// No Description.
		low?: any; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		open?: any; // inherited

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface IParallelCoordinates extends IBaseChart {
		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: D3 format for each x axis
		Default: Use the default formatter scale.tickFormat
		Example(s):
			chart.dimensionFormats(["%","","0.2f"])
		*/
		dimensionFormats?: string[];

		/*
		Description: Name of each dimension, used for each axis.
		Default: []
		Example(s):
			chart.dimensionNames(["axis1","axis2","axis3"])
		*/
		dimensionNames?: string[];

		/*
		Description: Deprecated. Use dimensionsNames instead.
		*/
		dimensions?: any;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Specifies each line tension. Values between 0 and 1.
		Default: 1
		Example(s):
			chart.lineTension(0.85)
		*/
		lineTension?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

	}



	export interface IPieChart extends IBaseChart {
		// Subcomponents:
		legend?: ILegend;
		pie?: IPie;
		tooltip?: ITooltip;

		/*
		Description: Specifies each slice size, by an inner and a outer radius. Values between 0 and 1.
		Default: [{inner: donutRatio, outer: 1}]
		Example(s):
			chart.arcsRadius({"inner":0.6,"outer":0.8})
		*/
		arcsRadius?: IArcRadius; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: D3 3.4+, For donut charts only, the corner radius of the slices.  Typically used with padAngle.
		Default: 0
		Example(s):
			chart.cornerRadius(3)
		*/
		cornerRadius?: number; // inherited

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Whether to make a pie graph a donut graph or not.
		Default: false
		Example(s):
			chart.donut(true)
		*/
		donut?: boolean; // inherited

		// No Description.
		donutLabelsOutside?: any; // inherited

		/*
		Description: Percent of pie radius to cut out of the middle to make the donut.  It is multiplied by the outer radius to calculate the inner radius, thus it should
			be between 0 and 1.
		Default: 0.5
		Example(s):
			chart.donutRatio(0.75)
		*/
		donutRatio?: number; // inherited

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Function used to manage the ending angle of the pie/donut chart
		Default: Ignored unless set
		Example(s):
			chart.endAngle(function (d) {
        return d.endAngle / 2 - Math.PI / 2;
    })
		*/
		endAngle?: IAnyToNumberFunc; // inherited

		/*
		Description: For pie/donut charts, whether to increase slice radius on hover or not
		Default: true
		Example(s):
			chart.growOnHover(true)
		*/
		growOnHover?: boolean; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		// No Description.
		labelFormat?: any; // inherited

		/*
		Description: ?
		Default: false
		Example(s):
			chart.labelSunbeamLayout(true)
		*/
		labelSunbeamLayout?: boolean; // inherited

		/*
		Description: Pie/donut charts: The slice threshold size to not display the label because it woudl be too small of a space
		Default: 0.02
		Example(s):
			chart.labelThreshold(0.05)
		*/
		labelThreshold?: number; // inherited

		/*
		Description: pie/donut charts only: what kind of data to display for the slice labels.  Options are key, value, or percent.
		Default: key
		Example(s):
			chart.labelType("key")
			chart.labelType("value")
			chart.labelType("percent")
		*/
		labelType?: string; // inherited

		/*
		Description: Whether pie/donut chart labels should be outside the slices instead of inside them
		Default: true
		Example(s):
			chart.labelsOutside(true)
		*/
		labelsOutside?: boolean; // inherited

		/*
		Description: Position of the legend (top or right)
		Default: top
		Example(s):
			chart.legendPosition("top")
			chart.legendPosition("right")
		*/
		legendPosition?: string;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: D3 3.4+, For donut charts only, the percent of the chart that should be spacing between slices.
		Default: 0
		Example(s):
			chart.padAngle(0.05)
		*/
		padAngle?: number; // inherited

		// No Description.
		pieLabelsOutside?: any; // inherited

		/*
		Description: Show pie/donut chart labels for each slice
		Default: true
		Example(s):
			chart.showLabels(true)
		*/
		showLabels?: boolean; // inherited

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Function used to manage the starting angle of the pie/donut chart
		Default: Ignored unless set
		Example(s):
			chart.startAngle(function (d) {
        return d.startAngle / 2 - Math.PI / 2;
    })
		*/
		startAngle?: IAnyToNumberFunc; // inherited

		/*
		Description: Text to include within the middle of a donut chart
		Default: Blank String
		Example(s):
			chart.title("Customers")
		*/
		title?: string; // inherited

		/*
		Description: Vertical offset for the donut chart title
		Example(s):
			chart.titleOffset(-10)
			chart.titleOffset(23)
		*/
		titleOffset?: number; // inherited

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: D3 Format object for the label of pie/donut, discrete bar and multibar charts.
		Default: d3.format(",.2f")
		*/
		valueFormat?: any; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number; // inherited

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

	}



	export interface IScatterChart extends IBaseChart {
		// Subcomponents:
		scatter?: IScatter;
		legend?: ILegend;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		// No Description.
		container?: any;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		// No Description.
		showDistX?: any;

		// No Description.
		showDistY?: any;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		// No Description.
		tooltipXContent?: any;

		// No Description.
		tooltipYContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ISparklinePlus extends IBaseChart {
		// Subcomponents:
		sparkline?: ISparkline;

		// No Description.
		alignValue?: any;

		// No Description.
		animate?: any; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		rightAlignValue?: any;

		/*
		Description: Shows the last value in the sparkline to the right of the line.
		Default: true
		Example(s):
			chart.showLastValue(false)
		*/
		showLastValue?: boolean;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		// No Description.
		xTickFormat?: any;

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

		// No Description.
		yTickFormat?: any;

	}



	export interface IStackedAreaChart extends IBaseChart {
		// Subcomponents:
		stacked?: ILine;
		legend?: ILegend;
		controls?: IControls;
		xAxis?: IAxis;
		yAxis?: IAxis;
		tooltip?: ITooltip;

		// No Description.
		clearHighlights?: any; // inherited

		/*
		Description: If true, masks lines within the X and Y scales using a clip-path
		Default: false
		Example(s):
			chart.clipEdge(true)
		*/
		clipEdge?: boolean; // inherited

		/*
		Description: When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you set how far away from the actua
			l point you can put the mouse for it to select the point.
		Default: 25
		Example(s):
			chart.clipRadius(20)
			chart.clipRadius(function (d) {
        return 20;
    })
		*/
		clipRadius?: any /* number or function */; // inherited

		/*
		Description: When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.clipVoronoi(false)
		*/
		clipVoronoi?: boolean; // inherited

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: Object that defines the labels for control items in the graph.  For instance, in the stackedAreaChart, there are controls for making it stacked, expan
			ded, or stream.  For stacked bar charts, there is stacked and grouped.
		Default: Depends on chart type
		Example(s):
			chart.controlLabels({"stacked":"Stack It","stream":"Stream dat","expanded":"Xpand"})
			chart.controlLabels({"grouped":"Group em","stacked":"Stack em"})
		*/
		controlLabels?: IControlLabels;

		// No Description.
		controlOptions?: any;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: Like forceX and forceY, this forces certain values onto the point scale
		Default: []
		Example(s):
			chart.forcePoint(1)
			chart.forcePoint(2)
			chart.forcePoint(3)
			chart.forcePoint(4)
		*/
		forcePoint?: number; // inherited

		/*
		Description: List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the xDomain option.
		Default: []
		Example(s):
			chart.forceX([-50,0,50])
		*/
		forceX?: number[]; // inherited

		/*
		Description: List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain but doesn't override the whole
			domain.  This option only applies if you have not overridden the whole domain with the yDomain option.
		Default: []
		Example(s):
			chart.forceY([-50,0,50])
		*/
		forceY?: number[]; // inherited

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number;

		// No Description.
		highlightPoint?: any; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.
		Default: true
		Example(s):
			chart.interactive(false)
		*/
		interactive?: boolean; // inherited

		/*
		Description: controls the line interpolation between points, many options exist, see the D3 reference:
			https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate
		Default: linear
		Example(s):
			chart.interpolate("linear")
			chart.interpolate("step")
		*/
		interpolate?: string; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		// No Description.
		offset?: any; // inherited

		// No Description.
		order?: any; // inherited

		/*
		Description: ?
		Default: false
		Example(s):
			chart.padData(true)
		*/
		padData?: boolean; // inherited

		// No Description.
		padDataOuter?: any; // inherited

		/*
		Description: Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for active.
		Default: function(d) { return !d.notActive }
		Example(s):
			chart.pointActive(function (d) {
        // d has x, y, size, shape, and series attributes.
        // here, we disable all points that are not a circle
        return d.shape !== "circle";
    })
		*/
		pointActive?: IAnyToBoolFunc; // inherited

		/*
		Description: Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.pointDomain([-20,-10,0,10,20])
			chart.pointDomain([-1,-0.5,0.5,1])
		*/
		pointDomain?: number[]; // inherited

		/*
		Description: Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.pointRange([-20,-10,0,10,20])
			chart.pointRange([-1,-0.5,0.5,1])
		*/
		pointRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		pointScale?: any; // inherited

		/*
		Description: Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also create your own symbols and set t
			hem onto nv.utils.symbolMap if you want, then just reference them by name like the others (see scatterGraph example for a demo)
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type
		Default: function(d) { return d.shape || "circle" }
		Example(s):
			chart.pointShape("circle")
			chart.pointShape("cross")
			chart.pointShape(function (d) {
        return d.calculateSymbolType();
    })
		*/
		pointShape?: any /* string or function */; // inherited

		/*
		Description: Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.
			https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size
		Default: function(d) { return d.size || 1}
		Example(s):
			chart.pointSize(0.5)
			chart.pointSize(function (d) {
        // use function attached to the data to calculate size
        return d.calculateSymbolSize();
    })
		*/
		pointSize?: any /* number or function */; // inherited

		/*
		Description: When only one Y axis is used, this puts the Y axis on the right side instead of the left.
		Default: false
		Example(s):
			chart.rightAlignYAxis(true)
		*/
		rightAlignYAxis?: boolean;

		/*
		Description: Whether to show extra controls or not.  Extra controls include things like making mulitBar charts stacked or side by side.
		Default: true
		Example(s):
			chart.showControls(true)
		*/
		showControls?: boolean;

		/*
		Description: Whether to display the legend or not
		Default: true
		Example(s):
			chart.showLegend(true)
		*/
		showLegend?: boolean;

		/*
		Description: Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: false
		Example(s):
			chart.showVoronoi(true)
		*/
		showVoronoi?: boolean; // inherited

		/*
		Description: Display or hide the X axis
		Default: true
		Example(s):
			chart.showXAxis(false)
		*/
		showXAxis?: boolean;

		/*
		Description: Display or hide the Y axis
		Default: true
		Example(s):
			chart.showYAxis(false)
		*/
		showYAxis?: boolean;

		// No Description.
		style?: any; // inherited

		/*
		Description: Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control tooltip content.
		*/
		tooltipContent?: any;

		/*
		Description: Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not.
		*/
		tooltips?: any;

		/*
		Description: Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  Turning this on will set the "i
			nteractive" and "useVoronoi" options to false to avoid conflicting.
		Default: false
		Example(s):
			chart.useInteractiveGuideline(true)
		*/
		useInteractiveGuideline?: boolean;

		/*
		Description: Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point itself.  Setting this to false wil
			l also set clipVoronoi to false.
			https://github.com/mbostock/d3/wiki/Voronoi-Geom
			http://bl.ocks.org/njvack/1405439
			http://bl.ocks.org/mbostock/8033015
		Default: true
		Example(s):
			chart.useVoronoi(false)
		*/
		useVoronoi?: boolean; // inherited

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number;

		/*
		Description: Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key for the slice.
		Default: function(d){ return d.x; }
		Example(s):
			chart.x(function (d) {
        return d.x;
    })
		*/
		x?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.xDomain([-20,-10,0,10,20])
			chart.xDomain([-1,-0.5,0.5,1])
		*/
		xDomain?: number[]; // inherited

		/*
		Description: Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.xRange([-20,-10,0,10,20])
			chart.xRange([-1,-0.5,0.5,1])
		*/
		xRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the X axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		xScale?: any; // inherited

		/*
		Description: Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value for the slice.
		Default: function(d){ return d.y; }
		Example(s):
			chart.y(function (d) {
        // don't show negative values
        return d.y < 0 ? 0 : d.y;
    })
		*/
		y?: IAnyToNumberFunc; // inherited

		/*
		Description: Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain
		Default: The scale is dynamically calculated based on graph data
		Example(s):
			chart.yDomain([-20,-10,0,10,20])
			chart.yDomain([-1,-0.5,0.5,1])
		*/
		yDomain?: number[]; // inherited

		/*
		Description: Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range
		Default: The range is dynamically calculated based on graph data
		Example(s):
			chart.yRange([-20,-10,0,10,20])
			chart.yRange([-1,-0.5,0.5,1])
		*/
		yRange?: number[]; // inherited

		/*
		Description: Override the default scale type for the Y axis
			https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear
		Default: d3.scale.linear()
		*/
		yScale?: any; // inherited

	}



	export interface ISunburstChart extends IBaseChart {
		// Subcomponents:
		sunburst?: ISunburst;
		tooltip?: ITooltip;

		/*
		Description: Colors to use for the different data.  If an array is given, it is converted to a function automatically.
		Default: nv.utils.defaultColor()
		Example(s):
			chart.color(["#FF0000","#00FF00","#0000FF"])
			chart.color(function (d, i) {
        var colors = d3.scale.category20().range().slice(10);
        return colors[i % colors.length - 1];
    })
		*/
		color?: any /* array or function */;

		/*
		Description: No longer used.  Use chart.dispatch.changeState(...) instead.
		*/
		defaultState?: any;

		/*
		Description: Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total time taken should be this value.
		Default: 250
		Example(s):
			chart.duration(1000)
		*/
		duration?: number;

		/*
		Description: The height the graph or component created inside the SVG should be made.
		Default: The height of the container element (normally the svg itself)
		Example(s):
			chart.height(600)
		*/
		height?: number; // inherited

		/*
		Description: Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  For charts, you can use this to specif
			y custom CSS for particular charts.  For example, if you set the chart to have id "woot", you can customize the CSS using the selector .nvd3.nv-chart-
			woot
		Default: A random ID is generated by default
		Example(s):
			chart.id(123)
			chart.id("chart56")
		*/
		id?: any /* number or string */; // inherited

		/*
		Description: Object containing the margins for the chart or component.  You can specify only certain margins in the object to change just those parts.
		Default: 0 for all margins
		Example(s):
			chart.margin({"top":10,"bottom":10})
			chart.margin({"left":5,"right":5,"top":10,"bottom":10})
		*/
		margin?: IMargin;

		/*
		Description: For sunburst only: specifies the mode of drawing the sunburst segments. Can be "size" or "count". "size" draws the segments according to the "size" at
			tribute of the leaf nodes, "count" draws according to the amount of siblings a node has.
			http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad
		Default: count
		Example(s):
			chart.mode("size")
		*/
		mode?: string; // inherited

		/*
		Description: Message to display if no data is provided
		Default: No Data Available.
		Example(s):
			chart.noData("There is no Data to display")
		*/
		noData?: string;

		/*
		Description: The width the graph or component created inside the SVG should be made.
		Default: The width of the container element (normally the svg itself)
		Example(s):
			chart.width(900)
		*/
		width?: number; // inherited

	}
// }
// }