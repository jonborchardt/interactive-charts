// https://nvd3-community.github.io/nvd3/examples/documentation.html

module InteractiveChartsExampleApp { // todo: remove once we have the real nvd3 interfaces
    "use strict";

    export function generateNvd3TsInterfaces(): string {
        // get reference to global nvd3 object
        let nv = (<any>window).nv;
        if (typeof (nv) === "undefined" || null === nv) {
            throw new ReferenceError("nvd3 not found, please make sure to reference nvd3 before charts");
        }

        let stringData: string = "// quick and dirty typescript interfaces for nvd3 by Jon Borchardt @ aol 2015\n\n";

        let indent = "\t";

        // add common interfaces
        stringData += "export interface IPosition {\n" +
            indent + "top?: number;\n" +
            indent + "right?: number;\n" +
            "}\n\n";

        stringData += "export interface IMargin extends IPosition {\n" +
            indent + "bottom?: number;\n" +
            indent + "left?: number;\n" +
            "}\n\n";

        stringData += "export interface IArcRadius {\n" +
            indent + "inner?: number;\n" +
            indent + "outer?: number;\n" +
            "}\n\n";

        stringData += "export interface IControlLabels {\n" +
            indent + "stacked?: string;\n" +
            indent + "stream?: string;\n" +
            indent + "grouped?: string;\n" +
            indent + "expanded?: string;\n" +
            "}\n\n";

        stringData += "export interface IAnyToNumberFunc {\n" +
            indent + "(d: any): number;\n" +
            "}\n\n";

        stringData += "export interface IAnyWithIndexToNumberFunc {\n" +
            indent + "(d: any, i: number): number;\n" +
            "}\n\n";

        stringData += "export interface IAnyToBoolFunc {\n" +
            indent + "(d: any): boolean;\n" +
            "}\n\n";

        stringData += "export interface IAnyWithIndexToBoolFunc {\n" +
            indent + "(d: any, i: number): boolean;\n" +
            "}\n\n";

        stringData += "export interface IAnyToAnyFunc {\n" +
            indent + "(d: any): any/*string or number*/;\n" +
            "}\n\n";

        stringData += "export interface IAnyToStringFunc {\n" +
            indent + "(d: any): string;\n" +
            "}\n\n";

        stringData += "export interface INvd3Options {\n" +
            indent + "chart: IBaseChart;\n" +
            indent + "title?: ITitle;\n" +
            indent + "subtitle?: ISubtitle;\n" +
            indent + "caption?: ICaption;\n" +
            indent + "styles?: IStyles;\n" +
            "}\n\n";

        stringData += "export interface IBaseChart {\n" +
            indent + "width?: number;\n" +
            indent + "height?: number;\n" +
            indent + "margin?: IMargin;\n" +
            indent + "type: string;\n" +
            indent + "noData?: string;\n" +
            "}\n\n";

        stringData += "export interface ITitle {\n" +
            indent + "enable?: boolean;\n" +
            indent + "text: string;\n" +
            indent + "css?: ICss;\n" +
            "}\n\n";

        stringData += "export interface ISubtitle {\n" +
            indent + "enable?: boolean;\n" +
            indent + "text: string;\n" +
            indent + "css?: ICss;\n" +
            "}\n\n";

        stringData += "export interface ICaption {\n" +
            indent + "enable?: boolean;\n" +
            indent + "text: string;\n" +
            indent + "css?: ICss;\n" +
            indent + "html?: string;\n" +
            "}\n\n";

        stringData += "export interface IStyles {\n" +
            indent + "classes?: IClasses;\n" +
            indent + "css?: ICss;\n" +
            "}\n\n";

        stringData += "export interface ICss {\n" +
            indent + "width?: string;\n" +
            indent + "textAlign?: string;\n" +
            indent + "margin?: string;\n" +
            "}\n\n";

        stringData += "export interface IClasses {\n" +
            indent + "gallery?: boolean;\n" +
            "}\n\n";

        stringData += "export interface INvd3Data {\n" +
            indent + "key: string;\n" +
            indent + "value?: number;\n" +
            indent + "values?: any[];\n" +
            "}\n\n";

        stringData += "export interface INvd3SingleSeriesData extends INvd3Data {\n" +
            indent + "value: number;\n" +
            "}\n\n";

        stringData += "export interface INvd3MultiSeriesData extends INvd3Data {\n" +
            indent + "values: any[];\n" +
            "}\n\n";

        stringData += "export interface INvd3MultiChartSeriesData extends INvd3MultiSeriesData {\n" +
            indent + "yAxis: number;\n" +
            indent + "type: string;\n" +
            indent + "color: string;\n" +
            "}\n\n";

        stringData += "export interface IControls {\n" +
            indent + "width: number;\n" +
            indent + "height: number;\n" +
            indent + "align: boolean;\n" +
            indent + "rightAlign: boolean;\n" +
            indent + "padding: number;\n" +
            indent + "updateState: boolean;\n" +
            indent + "radioButtonMode: boolean;\n" +
            indent + "expanded: boolean;\n" +
            indent + "vers: string;\n" +
            indent + "margin: IMargin;\n" +
            "}\n\n";


        let charts = [
            "pieChart",
            "lineChart",
            "parallelCoordinates",
            "scatterChart",
            "stackedAreaChart",
            "sparklinePlus",
            "multiChart",
            "multiBarHorizontalChart",
            "multiBarChart",
            "lineWithFocusChart",
            "linePlusBarChart",
            "historicalBarChart",
            "discreteBarChart",
            "cumulativeLineChart",
            "bulletChart",
            "ohlcBarChart",
            "boxPlotChart",
            "sunburstChart",
            "candlestickBarChart"
        ].sort();

        let parts = [
            "line",
            "axis",
            "bullet",
            "scatter",
            "ohlcBar",
            "pie",
            "historicalBar",
            "multiBarHorizontal",
            "multiBar",
            "legend",
            "tooltip",
            "boxPlot",
            "candlestickBar",
            "sparkline",
            "discreteBar",
            "sunburst"
        ].sort();

        charts = parts.concat(charts);

        let partToInterfaceMap = {
            // bars: "", bars1: "", bars2: "", // replaced with below
            CandlestickBarChart_bars: "ICandlestickBar",
            HistoricalBarChart_bars: "IHistoricalBar",
            LinePlusBarChart_bars: "IHistoricalBar",
            LinePlusBarChart_bars2: "IHistoricalBar",
            OhlcBarChart_bars: "IOhlcBar",
            MultiChart_bars1: "IMultiBar",
            MultiChart_bars2: "IMultiBar",
            boxplot: "IBoxPlot",
            bullet: "IBullet",
            controls: "IControls",
            discretebar: "IDiscreteBar",
            legend: "ILegend",
            lines: "ILine",
            lines1: "ILine",
            lines2: "ILine",
            multibar: "IMultiBar", // todo, is this correct?
            pie: "IPie",
            scatter: "IScatter",
            sparkline: "ISparkline",
            stack1: "ILine", // todo, is this correct?
            stack2: "ILine", // todo, is this correct?
            stacked: "ILine", // todo, is this correct?
            sunburst: "ISunburst",
            tooltip: "ITooltip",
            x2Axis: "IAxis",
            xAxis: "IAxis",
            y1Axis: "IAxis",
            y2Axis: "IAxis",
            y3Axis: "IAxis",
            y4Axis: "IAxis",
            yAxis: "IAxis",
            yAxis1: "IAxis",
            yAxis2: "IAxis"
        };

        // object infos
        let optionInfo = {
            title: {
                desc: "Text to include within the middle of a donut chart",
                default: "Blank String",
                examples: ["Customers"]
            },
            titleOffset: {
                desc: "Vertical offset for the donut chart title",
                examples: [-10, 23]
            },
            color: {
                desc: "Colors to use for the different data.  If an array is given, it is converted to a function automatically.",
                default: "nv.utils.defaultColor()",
                examples: [
                    ["#FF0000", "#00FF00", "#0000FF"],
                    function (d, i) {
                        let colors = d3.scale.category20().range().slice(10);
                        return colors[i % colors.length - 1];
                    }
                ]
            },
            showLegend: {
                desc: "Whether to display the legend or not",
                default: true,
                examples: [true]
            },
            showControls: {
                desc: "Whether to show extra controls or not.  Extra controls include things like making mulitBar charts stacked or side by " +
                "side.",
                default: true,
                examples: [true]
            },
            tooltips: {
                desc: "Deprecated.  Use chart.tooltip.enabled or chart.interactive to control if tooltips are enabled or not."
            },
            tooltipContent: {
                desc: "Deprecated.  Use chart.tooltip.contentGenerator or chart.interactiveGuideline.tooltip.contentGenerator to control " +
                "tooltip content."
            },
            noData: {
                desc: "Message to display if no data is provided",
                default: "No Data Available.",
                examples: ["There is no Data to display"]
            },
            duration: {
                desc: "Duration in ms to take when updating chart.  For things like bar charts, each bar can animate by itself but the total " +
                "time taken should be this value.",
                default: 250,
                examples: [1000]
            },
            defaultState: {
                desc: "No longer used.  Use chart.dispatch.changeState(...) instead."
            },
            showLabels: {
                desc: "Show pie/donut chart labels for each slice",
                default: true,
                examples: [true]
            },
            width: {
                desc: "The width the graph or component created inside the SVG should be made.",
                default: "The width of the container element (normally the svg itself)",
                examples: [900]
            },
            height: {
                desc: "The height the graph or component created inside the SVG should be made.",
                default: "The height of the container element (normally the svg itself)",
                examples: [600]
            },
            donut: {
                desc: "Whether to make a pie graph a donut graph or not.",
                default: false,
                examples: [true]
            },
            margin: {
                desc: "Object containing the margins for the chart or component.  You can specify only certain margins in the object to " +
                "change just those parts.",
                default: "0 for all margins",
                examples: [
                    { top: 10, bottom: 10 },
                    { left: 5, right: 5, top: 10, bottom: 10 }
                ],
                trumpType: "IMargin"
            },
            growOnHover: {
                desc: "For pie/donut charts, whether to increase slice radius on hover or not",
                default: true,
                examples: [true]
            },
            labelsOutside: {
                desc: "Whether pie/donut chart labels should be outside the slices instead of inside them",
                default: true,
                examples: [true]
            },
            cornerRadius: {
                desc: "D3 3.4+, For donut charts only, the corner radius of the slices.  Typically used with padAngle.",
                default: 0,
                examples: [3]
            },
            padAngle: {
                desc: "D3 3.4+, For donut charts only, the percent of the chart that should be spacing between slices.",
                default: 0,
                examples: [0.05]
            },
            labelThreshold: {
                desc: "Pie/donut charts: The slice threshold size to not display the label because it woudl be too small of a space",
                default: 0.02,
                examples: [0.05]
            },
            startAngle: {
                desc: "Function used to manage the starting angle of the pie/donut chart",
                default: "Ignored unless set",
                examples: [
                    function (d) {
                        return d.startAngle / 2 - Math.PI / 2;
                    }
                ],
                trumpType: "IAnyToNumberFunc"
            },
            endAngle: {
                desc: "Function used to manage the ending angle of the pie/donut chart",
                default: "Ignored unless set",
                examples: [
                    function (d) {
                        return d.endAngle / 2 - Math.PI / 2;
                    }
                ],
                trumpType: "IAnyToNumberFunc"
            },
            labelType: {
                desc: "pie/donut charts only: what kind of data to display for the slice labels.  Options are key, value, or percent. ",
                default: "key",
                examples: ["key", "value", "percent"]
            },
            x: {
                desc: "Proxy function to return the X value so adjustments can be made if needed.  For pie/donut chart this returns the key " +
                "for the slice.",
                default: "function(d){ return d.x; }",
                examples: [
                    function (d) {
                        return d.x;
                    }
                ],
                trumpType: "IAnyToNumberFunc"
            },
            y: {
                desc: "Proxy function to return the Y value so adjustments can be made if needed.  For pie/donut chart this returns the value " +
                "for the slice.",
                default: "function(d){ return d.y; }",
                examples: [
                    function (d) {
                        // don't show negative values
                        return d.y < 0 ? 0 : d.y;
                    }
                ],
                trumpType: "IAnyToNumberFunc"
            },
            id: {
                desc: "Applies the provided ID as part of the unique class name for the chart.  For tooltip, this value is read-only.  " +
                "For charts, you can use this to specify custom CSS for particular charts.  For example, if you set the chart to have " +
                "id \"woot\", you can customize the CSS using the selector .nvd3.nv-chart-woot",
                default: "A random ID is generated by default",
                examples: [123, "chart56"]
            },
            showXAxis: {
                desc: "Display or hide the X axis",
                default: true,
                examples: [false]
            },
            showYAxis: {
                desc: "Display or hide the Y axis",
                default: true,
                examples: [false]
            },
            rightAlignYAxis: {
                desc: "When only one Y axis is used, this puts the Y axis on the right side instead of the left.",
                default: false,
                examples: [true]
            },
            useInteractiveGuideline: {
                desc: "Sets the chart to use a guideline and floating tooltip instead of requiring the user to hover over specific hotspots.  " +
                "Turning this on will set the \"interactive\" and \"useVoronoi\" options to false to avoid conflicting.",
                default: false,
                examples: [true]
            },
            defined: {
                desc: "A provided function that allows a line to be non-continuous when not defined.",
                refs: ["https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined"],
                default: "function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }",
                examples: [
                    function (d, i) {
                        // returns false if Y value is non-numeric or null
                        return true;  // !isNaN(getY(d, i)) && getY(d, i) !== null;
                    }
                ],
                trumpType: "IAnyWithIndexToBoolFunc"
            },
            interpolate: {
                desc: "controls the line interpolation between points, many options exist, see the D3 reference:",
                refs: ["https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate"],
                default: "linear",
                examples: ["linear", "step"]
            },
            clipEdge: {
                desc: "If true, masks lines within the X and Y scales using a clip-path",
                default: false,
                examples: [true]
            },
            isArea: {
                desc: "Function to define if a line is a normal line or if it fills in the area.  Notice the default gets the value from the " +
                "line's definition in data.  If a non-function is given, it the value is used for all lines.",
                default: "function(d) { return d.area }",
                examples: [
                    true,
                    function (d) {
                        return !!d.myCustomAttribute;
                    }
                ]
            },
            useVoronoi: {
                desc: "Use voronoi diagram to select nearest point to display tooltip instead of requiring a hover over the specific point " +
                "itself.  Setting this to false will also set clipVoronoi to false.",
                refs: [
                    "https://github.com/mbostock/d3/wiki/Voronoi-Geom",
                    "http://bl.ocks.org/njvack/1405439",
                    "http://bl.ocks.org/mbostock/8033015"],
                default: true,
                examples: [false]
            },
            clipVoronoi: {
                desc: "When useVoronoi is on, this masks each voronoi section with a circle to limit selection to smaller area.",
                refs: [
                    "https://github.com/mbostock/d3/wiki/Voronoi-Geom",
                    "http://bl.ocks.org/njvack/1405439",
                    "http://bl.ocks.org/mbostock/8033015"],
                default: true,
                examples: [false]
            },
            showVoronoi: {
                desc: "Displays the voronoi areas on the chart.  This is mostly helpful when debugging issues.",
                refs: [
                    "https://github.com/mbostock/d3/wiki/Voronoi-Geom",
                    "http://bl.ocks.org/njvack/1405439",
                    "http://bl.ocks.org/mbostock/8033015"],
                default: false,
                examples: [true]
            },
            clipRadius: {
                desc: "When useVoronoi and clipVoronoi are true, you can control the clip radius with this option.  Essentially this lets you " +
                "set how far away from the actual point you can put the mouse for it to select the point.",
                default: 25,
                examples: [
                    20,
                    function (d) {
                        return 20;
                    }
                ]
            },
            xScale: {
                desc: "Override the default scale type for the X axis",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear"],
                default: "d3.scale.linear()"
            },
            yScale: {
                desc: "Override the default scale type for the Y axis",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear"],
                default: "d3.scale.linear()"
            },
            pointScale: {
                desc: "Override the default scale type for the shapes used in the scatter plot. Scatter is also used to make the hover points " +
                "on lines.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear"],
                default: "d3.scale.linear()"
            },
            pointSize: {
                desc: "Specifies the size of the points in a scatter.  Scatter is also used to make the hover points on lines.",
                default: "function(d) { return d.size || 1}",
                refs: ["https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_size"],
                examples: [
                    0.5,
                    function (d) {
                        // use function attached to the data to calculate size
                        return d.calculateSymbolSize();
                    }
                ]
            },
            forcePoint: {
                desc: "Like forceX and forceY, this forces certain values onto the point scale",
                default: "[]",
                examples: [1, 2, 3, 4]
            },
            pointDomain: {
                desc: "Like xDomain and yDomain, this sets the range for the point scale.  Scatter is also used to make the hover points on " +
                "lines.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain"],
                default: "The scale is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            pointRange: {
                desc: "Like xRange and yRange, this sets the range for the point scale.  Scatter is also used to make the hover points on " +
                "lines.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range"],
                default: "The range is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            pointShape: {
                desc: "Specify the shape of the points in a scatter.  Scatter is also used to make the hover points on lines.  You can also " +
                "create your own symbols and set them onto nv.utils.symbolMap if you want, then just reference them by name like the " +
                "others (see scatterGraph example for a demo)",
                refs: ["https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol_type"],
                default: "function(d) { return d.shape || \"circle\" }",
                examples: [
                    "circle",
                    "cross",
                    function (d) {
                        return d.calculateSymbolType();
                    }
                ]
            },
            pointActive: {
                desc: "Function used to determine if scatter points are active or not, returns false to denote them as inactive and true for " +
                "active.",
                default: "function(d) { return !d.notActive }",
                examples: [
                    function (d) {
                        // d has x, y, size, shape, and series attributes.
                        // here, we disable all points that are not a circle
                        return d.shape !== "circle";
                    }
                ],
                trumpType: "IAnyToBoolFunc"
            },
            xDomain: {
                desc: "Defines the whole X scale's domain.  Using this will disable calculating the domain based on the data.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain"],
                default: "The scale is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            yDomain: {
                desc: "Defines the whole Y scale's domain.  Using this will disable calculating the domain based on the data.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain"],
                default: "The scale is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            xRange: {
                desc: "Override the X scale's range.  Using this will disable calculating the range based on the data and chart width/height.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range"],
                default: "The range is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            yRange: {
                desc: "Override the Y scale's range.  Using this will disable calculating the range based on the data and chart width/height.",
                refs: ["https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_range"],
                default: "The range is dynamically calculated based on graph data",
                examples: [
                    [-20, -10, 0, 10, 20],
                    [-1, -0.5, 0.5, 1]
                ]
            },
            forceX: {
                desc: "List of numbers to Force into the X scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the X domain " +
                "but doesn't override the whole domain.  This option only applies if you have not overridden the whole domain with the " +
                "xDomain option.",
                default: "[]",
                examples: [
                    [-50, 0, 50]
                ]
            },
            forceY: {
                desc: "List of numbers to Force into the Y scale (ie. 0, or a max / min, etc.).  This ensures the numbers are in the Y domain " +
                "but doesn't override the whole domain.  This option only applies if you have not overridden the whole domain with the " +
                "yDomain option.",
                default: "[]",
                examples: [
                    [-50, 0, 50]
                ]
            },
            valueFormat: {
                desc: "D3 Format object for the label of pie/donut, discrete bar and multibar charts.",
                default: "d3.format(\",.2f\")"
            },
            donutRatio: {
                desc: "Percent of pie radius to cut out of the middle to make the donut.  It is multiplied by the outer radius to calculate " +
                "the inner radius, thus it should be between 0 and 1.",
                default: "0.5",
                examples: [0.75]
            },
            legendPosition: {
                desc: "Position of the legend (top or right)",
                default: "top",
                examples: ["top", "right"]
            },
            labelSunbeamLayout: {
                desc: "?",
                default: false,
                examples: [true]
            },
            interactive: {
                desc: "A master flag for turning chart interaction on and off.  This overrides all tooltip, voronoi, and guideline options.",
                default: true,
                examples: [false]
            },
            staggerLabels: {
                desc: "Makes the X labels stagger at different distances from the axis so they're less likely to overlap.",
                default: false,
                examples: [true]
            },
            showValues: {
                desc: "Prints the Y values on the top of the bars.  Only recommended to use if there aren't many bars.",
                default: false,
                examples: [true]
            },
            showLastValue: {
                desc: "Shows the last value in the sparkline to the right of the line.",
                default: true,
                examples: [false]
            },
            padData: {
                desc: "?",
                default: false,
                examples: [true]
            },
            barColor: {
                desc: "For bar charts, the \"color\" option makes each bar a different color.  For multibar, this option lets you specific a " +
                "color for each bar group to have the same color but differentiated by shading.",
                default: "Not Enabled",
                examples: [
                    ["#FF0000", "#00FF00", "#0000FF"],
                    function (d, i) {
                        let colors = d3.scale.category20().range().slice(10);
                        return colors[i % colors.length - 1];
                    }
                ]
            },
            rotateLabels: {
                desc: "Rotates the X axis labels by the specified degree.",
                default: 0,
                examples: [90, -45]
            },
            legendLeftAxisHint: {
                desc: "The extra text after the label in the legend that tells what axis the series belongs to, for any series on the left axis.",
                default: " (left axis)",
                examples: [" (L)", " [LEFT]"]
            },
            legendRightAxisHint: {
                desc: "The extra text after the label in the legend that tells what axis the series belongs to, for any seris on the right axis.",
                default: " (right axis)",
                examples: [" (R)", " [RIGHT]"]
            },
            controlLabels: {
                desc: "Object that defines the labels for control items in the graph.  For instance, in the stackedAreaChart, there are controls " +
                "for making it stacked, expanded, or stream.  For stacked bar charts, there is stacked and grouped.",
                default: "Depends on chart type",
                examples: [
                    { stacked: "Stack It", stream: "Stream dat", expanded: "Xpand" },
                    { grouped: "Group em", stacked: "Stack em" }
                ],
                trumpType: "IControlLabels"
            },
            groupSpacing: {
                desc: "The padding between bar groups, this is passed as the padding attribute of rangeBands",
                refs: ["https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands"],
                default: 0.1,
                examples: [0.5]
            },
            padding: {
                desc: "Specifies how much spacing there is between legend items.",
                default: "28",
                examples: ["40"]
            },
            arcsRadius: {
                desc: "Specifies each slice size, by an inner and a outer radius. Values between 0 and 1.",
                default: "[{inner: donutRatio, outer: 1}]",
                examples: [{ inner: 0.6, outer: 0.8 }],
                trumpType: "IArcRadius"
            },
            lineTension: {
                desc: "Specifies each line tension. Values between 0 and 1.",
                default: 1,
                examples: [0.85]
            },
            dimensions: {
                desc: "Deprecated. Use dimensionsNames instead. "
            },
            dimensionNames: {
                desc: "Name of each dimension, used for each axis.",
                default: "[]",
                examples: [["axis1", "axis2", "axis3"]]
            },
            dimensionFormats: {
                desc: "D3 format for each x axis",
                default: "Use the default formatter scale.tickFormat",
                examples: [["%", "", "0.2f"]]
            },
            gravity: {
                desc: "Can be \"n\",\"s\",\"e\",\"w\". Determines how tooltip is positioned.",
                default: "w",
                examples: ["n"],
                example_object: "chart.tooltip"
            },
            snapDistance: {
                desc: "Tolerance allowed before tooltip is moved from its current position (creates \"snapping\" effect)",
                default: 0,
                examples: [10],
                example_object: "chart.tooltip"
            },
            fixedTop: {
                desc: "For tooltip: If not null, this fixes the top position of the tooltip.",
                default: "null",
                examples: [50],
                example_object: "chart.tooltip"
            },
            chartContainer: {
                desc: "For tooltip: Parent dom element of the SVG that holds the chart.  This will make the tooltip dom be created inside " +
                "this container instead of on the document body.",
                default: "null",
                example_object: "chart.tooltip"
            },
            hidden: {
                desc: "For tooltip: show or hide the tooltip by setting this to true or false.  Tooltips used to be created and destroyed, " +
                "but now we re-used the element and set opacity to 1 or 0.",
                default: "false",
                examples: [true],
                example_object: "chart.tooltip"
            },
            hideDelay: {
                desc: "Delay in ms before the tooltip hides itself after a mouseout event.  A new mouseover event cancels the hide if within " +
                "this timeout period.",
                default: 400,
                examples: [200],
                example_object: "chart.tooltip"
            },
            position: {
                desc: "For tooltip: sets the top/left positioning for the tooltip.  Should be given an object with \"left\" and/or \"top\" " +
                "attributes.  You can override just one, just like the \"margin\" option on charts.",
                default: "Starts off with {top: 0, left: 0}",
                examples: [{ top: 200, left: 300 }, { left: 50 }],
                example_object: "chart.tooltip",
                trumpType: "IPosition"
            },
            contentGenerator: {
                desc: "For tooltip: Function that generates the tooltip content html.  This replaces the \"tooltipContent\" option that was " +
                "on most charts.  Please note that the data passed this function is usually different depending on the chart, so you'll " +
                "probably need to console.log() the input object.  Also, the data passed is always a single object now, so previous " +
                "functions written for the tooltipContent option will have to be adjusted accordingly.",
                default: "See contentGenerator function in tooltip.js",
                examples: [function (obj) { return JSON.stringify(obj); }],
                example_object: "chart.tooltip",
                trumpType: "IAnyToStringFunc"
            },
            valueFormatter: {
                desc: "For tooltip: formats the y axis value(s) in the tooltip",
                default: "Uses the yAxis' tickFormat() option",
                examples: [function (d) { return d > 0 ? d : 0; }],
                example_object: "chart.tooltip",
                trumpType: "IAnyToAnyFunc"
            },
            headerFormatter: {
                desc: "For tooltip: formats the x axis value in the tooltip",
                default: "Uses the xAxis' tickFormat() option",
                examples: [function (d) { return d + " monkeys"; }],
                example_object: "chart.tooltip",
                trumpType: "IAnyToStringFunc"
            },
            headerEnabled: {
                desc: "For tooltip: show the x axis value in the tooltip or not (not valid for pie charts for instance)",
                default: "true",
                examples: [false],
                example_object: "chart.tooltip"
            },
            enabled: {
                desc: "For tooltip: completely enables or disabled the tooltip",
                default: "true",
                examples: [false],
                example_object: "chart.tooltip"
            },
            tooltipElem: {
                desc: "For tooltip: returns the dom element of the tooltip.  This is read-only, you cannot set this value."
            },
            mode: {
                desc: "For sunburst only: specifies the mode of drawing the sunburst segments. Can be \"size\" or \"count\". \"size\" draws " +
                "the segments according to the \"size\" attribute of the leaf nodes, \"count\" draws according to the amount of siblings " +
                "a node has.",
                default: "count",
                refs: ["http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad"],
                examples: ["size"]
            }
        };


        // loop through chart options, build the list of options for each
        for (var i in charts) {
            if (charts.hasOwnProperty(i)) {
                let name = charts[i];

                if (nv.models[name]) {
                    let chart = nv.models[name]();

                    let isChart = charts.indexOf(name) > 0;

                    // add the chart object name, and jump link to it
                    name = name.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1));
                    stringData += "export interface I" + name + (isChart ? " extends IBaseChart" : "") + " {\n";

                    // build list of sub-components for this chart object
                    let props = Object.getOwnPropertyNames(chart);

                    let proplist = {};
                    for (var p in props) {
                        if (props.hasOwnProperty(p)) {
                            try {
                                let prop = chart[props[p]];
                                if ((prop instanceof Object) && !(prop instanceof Array) && prop._options) {
                                    proplist[props[p]] = props[p];
                                }
                            } catch (e) {
                            }
                        }
                    }
                    // add sub-components
                    if (Object.keys(proplist).length > 0) {
                        stringData += indent + indent + "// Subcomponents:\n";
                        for (var pp in proplist) {
                            if (proplist.hasOwnProperty(pp)) {
                                let propMapped = partToInterfaceMap[pp];
                                if ("undefined" === typeof propMapped) {
                                    propMapped = partToInterfaceMap[name + "_" + pp];
                                }
                                stringData += indent + pp + "?: " + propMapped + ";\n";
                            }
                        }
                        stringData += "\n";
                    }

                    // collect all the options
                    let alloptions = {};
                    if (chart._options) {
                        let ops = Object.getOwnPropertyNames(chart._options);
                        for (var t in ops) {
                            if (ops.hasOwnProperty(t)) {
                                alloptions[ops[t]] = { name: ops[t] };
                            }
                        }
                    }
                    if (chart._inherited) {
                        for (var j2 in chart._inherited) {
                            if (chart._inherited.hasOwnProperty(j2)) {
                                let op = chart._inherited[j2];
                                if (chart._options[op] === undefined) {
                                    alloptions[op] = { name: op, note: "inherited" };
                                }
                            }
                        }
                    }
                    if (chart._d3options) {
                        for (var j3 in chart._d3options) {
                            if (chart._d3options.hasOwnProperty(j3)) {
                                let op2 = chart._d3options[j3];
                                alloptions[op2] = { name: op2, note: "inherited from D3" };
                            }
                        }
                    }

                    // now print the all out in alphabetical order
                    let alpha = Object.keys(alloptions).sort();
                    for (var j4 in alpha) {
                        // ignore internal options (start with an underscore)
                        if (alpha[j4].substring(0, 1) !== "_") {
                            let tt = alloptions[alpha[j4]].name;
                            let extra = alloptions[alpha[j4]].note;
                            let ttype = "any";

                            // add details
                            if (optionInfo[tt]) {
                                let desc = optionInfo[tt]["desc"];
                                let def = optionInfo[tt]["default"];
                                let ex = optionInfo[tt]["examples"];
                                let refs = optionInfo[tt]["refs"] || [];
                                let exampleObj = optionInfo[tt]["example_object"] || "chart";
                                let examples = [];
                                let inputs = [];
                                let trumpType = optionInfo[tt]["trumpType"];
                                let arrayType = "any";

                                // process examples
                                for (var ii in ex) {
                                    if (ex.hasOwnProperty(ii)) {
                                        let e = ex[ii];
                                        let etype = e instanceof Array ? "array" : typeof e;

                                        // if we are an array, store what kind of array we are
                                        if (etype === "array") {
                                            arrayType = typeof e[0];
                                        }

                                        if (inputs.indexOf(etype) < 0) {
                                            inputs.push(etype);
                                        }
                                        if (etype === "object" || etype === "array" || etype === "string") {
                                            e = JSON.stringify(e);
                                        }
                                        if (etype === "function") {
                                            // if function, remove the first 20 spaces in each line
                                            // due to indention in the info object
                                            e = e.toString().replace(/(\r\n|\n|\r)\s{16}/gm, "\n");
                                        }
                                        examples.push(exampleObj + "." + tt + "(" + e + ")");
                                    }
                                }

                                // build html of other option info
                                if (desc || def || examples.length) {
                                    stringData += indent + indent + "/*\n";
                                }
                                if (desc) {
                                    stringData += indent + indent + "Description: " + desc.substring(0, 150);
                                    if (desc.length > 150) {
                                        stringData += "\n" + indent + indent + indent + desc.substring(150, 300);
                                    }
                                    if (desc.length > 300) {
                                        stringData += "\n" + indent + indent + indent + desc.substring(300, 450);
                                    }
                                    for (var r in refs) {
                                        if (refs.hasOwnProperty(r)) {
                                            stringData += "\n" + indent + indent + indent + refs[r];
                                        }
                                    }
                                }
                                if (inputs.length) {
                                    // stringData += "\n" + indent + indent + "Input Type(s): " + inputs.join(" or ");
                                    if (inputs.length === 1) {
                                        if (inputs[0] === "number") {
                                            ttype = "number";
                                        } else if (inputs[0] === "boolean") {
                                            ttype = "boolean";
                                        } else if (inputs[0] === "string") {
                                            ttype = "string";
                                        } else if (inputs[0] === "function") {
                                            ttype = ("undefined" !== typeof trumpType) ? trumpType : "Function";
                                        } else if (inputs[0] === "array") {
                                            ttype = arrayType + "[]";
                                        } else if (inputs[0] === "object") {
                                            ttype = ("undefined" !== typeof trumpType) ? trumpType : "any /* object */";
                                        }
                                    } else {
                                        ttype = "any /* " + inputs.join(" or ") + " */";
                                    }
                                }
                                if (def !== undefined) {
                                    stringData += "\n" + indent + indent + "Default: " + def;
                                }
                                if (examples.length) {
                                    stringData += "\n" + indent + indent + "Example(s):\n";
                                    stringData += indent + indent + indent + examples.join("\n" + indent + indent + indent);
                                }
                                // end
                                if (desc || def || examples.length) {
                                    stringData += "\n" + indent + indent + "*/\n";
                                }
                            } else {
                                stringData += indent + indent + "// No Description.\n";
                            }

                            // add property
                            stringData += indent + tt + "?: " + ttype + ";" + (extra !== undefined ? " // " + extra : "") + "\n\n";
                        }
                    }

                    // close
                    stringData += "}\n\n\n\n";
                } else {
                    console.log("Chart missing: ", name);
                }
            }
        }

        let data = new Blob([stringData], { type: "text/plain" });
        let textFile = ((<any>window).URL || (<any>window).webkitURL).createObjectURL(data);
        return textFile;
    }
}
