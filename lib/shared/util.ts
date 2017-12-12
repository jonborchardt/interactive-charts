// interfaces, static functions and variables to help make generic chart creation faster and more consistent
// module InteractiveCharts.Shared.Util {
    "use strict";

    import * as moment from "moment";
    import * as d3 from "d3";
    import * as angular from "angular";
    import * as AngularChart from "../../lib/chart-manager/angular/interactive-charts-components";

    export interface IChartConfigService {
        setTrillionsLabel(str: string): void;
        setBillionsLabel(str: string): void;
        setMillionsLabel(str: string): void;
        setThousandsLabel(str: string): void;
        setNaNStr(str: string): void;
    }

    // static function to ellipse strings
    export function trim(str: string, len: number): string {
        if (len < 3) {
            len = 3;
        }
        if (str.length <= len) {
            return str;
        }
        return str.substring(0, len - 3) + "...";
    }

    class ChartConfig {
        TrillionUnit: string = "T";
        BillionUnit: string = "B";
        MillionUnit: string = "M";
        ThousandUnit: string = "k";
        NaNStr: string = "--";

        $get(): IChartConfigService {
            return {
                setTrillionsLabel: (str: string): void => {
                    this.TrillionUnit = str;
                },
                setBillionsLabel: (str: string): void => {
                    this.BillionUnit = str;
                },
                setMillionsLabel: (str: string): void => {
                    this.MillionUnit = str;
                },
                setThousandsLabel: (str: string): void => {
                    this.ThousandUnit = str;
                },
                setNaNStr: (str: string): void => {
                    this.NaNStr = str;
                }
            };
        }
    }

    var factoryProvider = new ChartConfig();
    AngularChart.Modules.charts.provider("chartConfigProvider", [() => factoryProvider]);

	/**
	 * comma formatters return numbers to x precision with commas between the 000
	 * @param d : Input number to be formatted
	 * @param format : formatted string.  Is a wrapper/helper over native d3.format to ensure that string returned by
	 * @returns {string}: Formatted value for the number
     */
    let numberFormatter = function (d: number, format: string): string {
        return isNaN(d) ? factoryProvider.NaNStr : removeExtraZeros(d3.format(format)(d));
    };

	/**
	 * Returns a formatted string which is rounded based on precision and subsequently comma formatted (for thousand, million, billion etc)
	 * @param d : Input number to be formatted
	 * @param precision: Precision for rounding
	 * @returns {string} : Formatted string
     */
    export function commaRoundFormatter(d: number, precision: number): string {
        return numberFormatter(d3.round(d, precision), ",");
    }

    export var commaFormatter0: Function = (d: number) => { return numberFormatter(d, ",.0f"); };
    export var commaFormatter1: Function = (d: number) => { return numberFormatter(d, ",.1f"); };
    export var commaFormatter2: Function = (d: number) => { return numberFormatter(d, ",.2f"); };
    export var commaFormatter3: Function = (d: number) => { return numberFormatter(d, ",.3f"); };

    // // ads ability to query for formatter based on precision
    export var commaFormatter = [commaFormatter0, commaFormatter1, commaFormatter2, commaFormatter3];

    // condense 50.0MM into 50MM but keep 50.1MM as 50.1MM
    export function removeExtraZeros(ret: string): string {
        var i: number = ret.indexOf(".");
        if (i > -1) {
            var str: string = ret.substr(i + 1);
            // check if substr for decimals (eg: 0000 in 3.0000 or 0001 in 3.0001) contains numerical value other than 0
            if (isNaN(Number(str)) || 0 === Number(str)) {
                // if not, return the substr upto "."
                ret = ret.substr(0, i);
            }
        }
        return ret;
    }

    // thousands formater
    export function commaKformatter(d: number, formatter: any, symbol: string): string {
        var ret: string = removeExtraZeros(symbol + formatter(d / 1000));
        return ret + factoryProvider.ThousandUnit;
    };

    // millions formatter
    export function commaMformatter(d: number, formatter: any, symbol: string): string {
        var ret: string = removeExtraZeros(symbol + formatter(d / Math.pow(1000, 2)));
        return ret + factoryProvider.MillionUnit;
    };

    // billions formatter
    export function commaBformatter(d: number, formatter: any, symbol: string): string {
        var ret: string = removeExtraZeros(symbol + formatter(d / Math.pow(1000, 3)));
        return ret + factoryProvider.BillionUnit;
    };

    // trillions formatter
    export function commaTformatter(d: number, formatter: any, symbol: string): string {
        var ret: string = removeExtraZeros(symbol + formatter(d / Math.pow(1000, 4)));
        return ret + factoryProvider.TrillionUnit;
    };

    // returns the correct formatter, k, MM, B, T
    export function commaShiftingFormatter(d: number, formatter?: any, symbol?: string, skipTruncate?: boolean): string {
        if (isNaN(d)) {
            return factoryProvider.NaNStr;
        }
        formatter = typeof formatter !== "undefined" ? formatter : commaFormatter1; // default param
        symbol = typeof symbol !== "undefined" ? symbol : ""; // default param
        skipTruncate = isDefinedAndNotNull(skipTruncate) ? skipTruncate : false;

        if (!skipTruncate && d >= Math.pow(1000, 4)) {
            return commaTformatter(d, formatter, symbol);
        }
        if (!skipTruncate && d >= Math.pow(1000, 3)) {
            return commaBformatter(d, formatter, symbol);
        }
        if (!skipTruncate && d >= Math.pow(1000, 2)) {
            return commaMformatter(d, formatter, symbol);
        }
        if (!skipTruncate && d >= 1000) {
            return commaKformatter(d, formatter, symbol);
        }
        return symbol + formatter(d);
    };

    // adds $
    export function currencyShiftingFormatter(d: number, formatter: any, skipTruncate?: boolean): string {
        skipTruncate = isDefinedAndNotNull(skipTruncate) ? skipTruncate : false;
        let valueAsStr: string = commaShiftingFormatter(d, formatter, "", skipTruncate);
        return valueAsStr.indexOf("-") > -1 ? valueAsStr.replace("-", "-$") : "$" + valueAsStr;
    };

    // name func pair
    export interface INamedOrderFunc {
        name: string;
        func: (groups: CrossFilter.Grouping<any, any>[]) => CrossFilter.Grouping<any, any>[];
    }

    // margin interface
    export interface IMarginObj {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }

    // label key value interface
    export interface ILabelKeyValueTuple extends CrossFilter.Grouping<any, any> {
        label: any; // crossfilter grups uses key+value, nvds stomps on key, so we need to store key as label if we are passing a group to nvd3
        percent?: number;
    }

    // sizes and margin for charts
    export interface ISizeData {
        width: number;
        height: number;
        margin: IMarginObj;
    }

    // dc specific options interface
    export interface IDcOptions {
        onFiltered?: (d: any) => void;
        label?: (p: { key: any; value: number }) => string;
        filterPrinter?: (filters: any) => string;
        title?: (p: {}) => string; // TODO: p is hard to type
        // add more as needed
    }

    // workaround to split strings that are too long
    export function wordBreak(str: string, lineMax?: number) {
        var result: string = "",
            examineStr: string = "",
            startAt: number = 0,
            suffix: string,
            len: number,
            endAt: number,
            incr: number;

        if (!isDefinedAndNotNull(str)) {
            return;
        }

        lineMax = lineMax || 32;
        len = str.length;
        if (len <= lineMax) {
            return str;
        }

        while (startAt <= (len - 1)) {
            if (str[startAt] === " ") {
                startAt = startAt + 1;
            }
            examineStr = str.substr(startAt, lineMax);
            if (str[startAt + lineMax] === " " || ((startAt + lineMax) > (len - 1))) {
                endAt = startAt + lineMax;
            } else {
                incr = examineStr.lastIndexOf(" ");
                endAt = (incr !== -1) ? startAt + incr : startAt + lineMax;
            }

            if (str.trim().length) {
                suffix = ((startAt + lineMax) < len) ? "<br />" : "";
                result = result + str.substr(startAt, endAt - startAt) + suffix;
            }
            startAt = endAt;
        }
        return result;
    };
    // need to override tooltips because of nvd3 error
    // we also cannot just simply use value and key formatters because they are different per chart
    export function multiSeriesContentGenerator(d: any, lineCharMax?: number) {
        if (d === null) {
            return "";
        }
        // fix bar vs line issue
        if ("undefined" === typeof d.data) { d.data = d.point; }

        // tooltip <div><table>:
        //   <thead><tr><td>[ nSeries ]</td></tr></thead> in tooltip <table>
        //   <tbody><tr><td>[ nKey ]</td><td>[ nVal ]</td></tr></tbody> in tooltip <table>
        var nSeries: any;
        var nKey: any;
        var nVal: any;

        // get display value for thead in the tooltip
        if (d.series.length && isDefinedAndNotNull(d.series[0].key)) {
            nSeries = d.series[0].key;
        } else {
            nSeries = moment.isMoment(d.data.key) ? (d.data.key.format("L") + " " + d.data.key.format("ddd")) : d.data.key;
        }

        // get display values for key and value in the tooltip
        if (moment.isMoment(d.data.key)) {
            nKey = (d.data.key.format("L") + " " + d.data.key.format("ddd"));
            nVal = d.data.value;
        } else {
            nKey = isDefinedAndNotNull(d.data.displayLabel) ? d.data.displayLabel : d.data.key;
            nVal = isDefinedAndNotNull(d.data.displayValue) ? d.data.displayValue : d.data.value;
        }

        if (lineCharMax && typeof nKey === "string") {
            nKey = wordBreak(nKey, lineCharMax);
        }

        if (!isNaN(nVal)) {
            nVal = commaShiftingFormatter(nVal);
        }

        var table = d3.select(document.createElement("table"));
        var theadEnter = table.selectAll("thead")
            .data([d])
            .enter().append("thead");
        theadEnter.append("tr")
            .append("td")
            .attr("colspan", 3)
            .append("strong")
            .classed("x-value", true)
            .html(nSeries);
        var tbodyEnter = table.selectAll("tbody")
            .data([d])
            .enter().append("tbody");
        var trowEnter = tbodyEnter.selectAll("tr")
            .data(p => p.series)
            .enter()
            .append("tr")
            .classed("highlight", (p: any) => p.highlight);
        trowEnter.append("td")
            .classed("legend-color-guide", true)
            .append("div")
            .style("background-color", (p: any) => p.color);
        trowEnter.append("td")
            .classed("key", true)
            .html((p) => nKey);
        trowEnter.append("td")
            .classed("value", true)
            .html((p) => nVal);
        trowEnter.selectAll("td").each(function (p) {
            if (p.highlight) {
                var opacityScale = d3.scale.linear().domain([0, 1]).range(["#fff", p.color]);
                var opacity = 0.6;
                d3.select(this)
                    .style("border-bottom-color", opacityScale(opacity))
                    .style("border-top-color", opacityScale(opacity));
            }
        });
        var html = (<any>table.node()).outerHTML; // any hack
        if (d.footer !== undefined) {
            html += "<div class='footer'>" + d.footer + "</div>";
        }
        return html;
    };

    // our rang only boxPlot has no q1, q2, q3, nor whiskers... and we want to add a text label per outlier
    export function rangeOnlyBoxPlotContentGenerator(d: any, lineCharMax?: number) {
        if (d === null) {
            return "";
        }

        // <table><tbody><tr><td>[COLOR]</td><td>[ nLabel ]</td><td>[ nValue ]</td></tr></tbody><table>
        var nLabel: any;
        var nValue: any;

        // we are a tooltip for a point if we dont have data
        if ("undefined" === typeof d.data) {
            let split: Array<string> = d.series[0].key.split(": "); // points are in the form of key = `${label}: ${value}`
            nLabel = split[0];
            nValue = split[1];
        }  else { // else we are a series
            if (moment.isMoment(d.data.label)) {
                nLabel = (d.data.label.format("L"));
            } else {
                nLabel = d.data.label;
            }
            nValue = `${commaShiftingFormatter(d.data.values.whisker_low)} to ${commaShiftingFormatter(d.data.values.whisker_high)}`;
        }
        // dont let labels get too long
        nLabel = wordBreak(nLabel, lineCharMax);
        // we only care about the first series
        d.series = d.series.slice(0, 1);

        var table = d3.select(document.createElement("table"));
        var tbodyEnter = table.selectAll("tbody")
            .data([d])
            .enter().append("tbody");
        var trowEnter = tbodyEnter.selectAll("tr")
            .data(p => p.series)
            .enter()
            .append("tr")
            .classed("highlight", (p: any) => p.highlight);
        trowEnter.append("td")
            .classed("legend-color-guide", true)
            .append("div")
            .style("background-color", (p: any) => p.color);
        trowEnter.append("td")
            .classed("key", true)
            .html((p) => nLabel);
        trowEnter.append("td")
            .classed("value", true)
            .html((p) => nValue);
        trowEnter.selectAll("td").each(function (p) {
            if (p.highlight) {
                var opacityScale = d3.scale.linear().domain([0, 1]).range(["#fff", p.color]);
                var opacity = 0.6;
                d3.select(this)
                    .style("border-bottom-color", opacityScale(opacity))
                    .style("border-top-color", opacityScale(opacity));
            }
        });
        var html = (<any>table.node()).outerHTML; // any hack
        if (d.footer !== undefined) {
            html += "<div class='footer'>" + d.footer + "</div>";
        }
        return html;
    };

    export function median(array: Array<number>): number {
        if (array.length % 2 === 1) {  // eg 5
            return array[Math.floor(array.length / 2)]; // floor(5/2) = 2, so return 0 1 [2] 3 4
        } else { // eg 4
            return (array[array.length / 2] + array[(array.length / 2) - 1]) / 2; // (4/2)=2, so return 0 [1 2] 3
        }
    }

    export function nullWrap<T>(val: T): T {
        return internalIsDefinedAndNotNull(val) ? val : <T>{};
    }
    function internalIsDefinedAndNotNull(obj: any): boolean {
        return angular.isDefined(obj) && null !== obj;
    }
    export function isDefinedAndNotNull(...objs: any[]): boolean {
        let ret: boolean = true;
        objs.forEach((obj: any) => {
            if (ret) { // if we hit a false, dont continue to check
                ret = internalIsDefinedAndNotNull(obj);
            }
        });
        return ret;
    }
    export function isDefinedAndTrue(val: any): boolean {
        return internalIsDefinedAndNotNull(val) && typeof val === "boolean" && val;
    }
    export function isDefinedNumber(n: any): boolean {
        return internalIsDefinedAndNotNull(n) && angular.isNumber(n) && !isNaN(n) && isFinite(n);
    }
    export function isDefinedPositiveNonZeroNumber(n: any): boolean {
        return isDefinedNumber(n) && n > 0;
    }
    export function isDefinedString(n: any): boolean {
        return internalIsDefinedAndNotNull(n) && angular.isString(n) && n !== "";
    }
    /*
     http://stackoverflow.com/a/4994244
     */
    export function isEmpty(obj: any): boolean {

        // null and undefined are "empty"
        if (!internalIsDefinedAndNotNull(obj)) {
            return true;
        }

        if (obj instanceof Array) {
            if (obj.length > 0) {
                return false;
            }
            if (obj.length === 0) {
                return true;
            }
        }

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }

        return true;
    }

    // returns true if the first number is within epsilon of the second number
    export function isCloseTo(number: number, target: number, epsilon: number = 1e-10): boolean {
        return Math.abs(number - target) < epsilon;
    }

    // returns true if the fist nunmber is within epsilon oz zero
    export function isCloseToZero(number: number, epsilon: number = 1e-10): boolean {
        return isCloseTo(number, 0, epsilon);
    }

    // find and return first value
    export function first<T>(array: T[], predicate: (value: T) => boolean): T {
        if (!internalIsDefinedAndNotNull(array) || !internalIsDefinedAndNotNull(predicate)) {
            return null;
        }
        return array.filter(predicate)[0];
    }

    // removes extra spaces with Regex
    export function removeExtraSpaces(text: string): string {
        return text.replace(/\s+/g, " ").trim();
    }

    export function getSuffix(str: string, delim: string = "."): string {
        return typeof str === "string" && str.indexOf(delim) > -1 ? str.split(delim)[1] : str;
    }

    export interface IDictionary<T> {
        [id: string]: T;
    }
// }
