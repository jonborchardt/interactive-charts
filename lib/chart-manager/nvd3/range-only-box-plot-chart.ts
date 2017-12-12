// RangeOnlyBoxPlotChart
// an NVd3 based chart that looks like a box blot but only shows range, no q1, q2, q3, whiskers
// http://krispo.github.io/angular-nvd3/#/boxPlotChart

"use strict";

import * as moment from "moment";
import {
    IAbstractNvd3CoordinateGridChart,
    IAbstractNvd3CoordinateGridChartViewModel,
    AbstractNvd3CoordinateGridChartViewModel
} from "./abstract-nvd3-coordinate-grid-chart-view-model";
import {
    IChartManager
} from "../chart-manager";
import * as nvd3 from "./nvd3-interfaces"; // todo: remove once we have the real nvd3 interfaces
import * as Util from "../../shared/util";
import * as KeyMetricManager from "../../crossfilter-manager/key-metric-manager";


// chart def interface (contains data on how to build the chartViewModel)
export interface IRangeOnlyBoxPlotChart<T> extends IAbstractNvd3CoordinateGridChart<T> {
    // add any additional options as we support them

    // colors for outliers
    outlierColorAccessor?: (series: any, index: number) => string;
    maxBoxWidth?: number;
}

// view model interface (the built chart)
export interface IRangeOnlyBoxPlotChartViewModel<T> extends IAbstractNvd3CoordinateGridChartViewModel<T> {
    // add any additional options as we support them
}

// view model class (use init to add most chart specific nvd3 options)
export class RangeOnlyBoxPlotChartViewModel<T> extends AbstractNvd3CoordinateGridChartViewModel<T> implements IRangeOnlyBoxPlotChartViewModel<T> {
    outerMax = 0; // used to set max y value
    constructor(chartBase: IRangeOnlyBoxPlotChart<T>, chartManager: IChartManager<T>) {
        super(chartBase, chartManager);

        this.chartType = "boxPlotChart";

        this.manipulateFinalDataFunc = (originalData: Array<nvd3.INvd3Data>) => {
            let ret: Array<any> = [];
            if (Util.isEmpty(originalData)) {
                console.log(Error("Expecting Data"));
            } else {
                // grab first secondary grouping and use it as the secondary grouping values
                const secondaryGroupingValues = originalData[0].values;
                // for each value, make a box plot
                secondaryGroupingValues.forEach((sgv, i) => {
                    const items: Array<{ value: number, key: string }> = []; // full list of items
                    originalData.forEach(pgv => {
                        // if the key is a date, we want to pull it back for correct formatting
                        let key: string = pgv.key;
                        if (chartBase.crossfilterGrouping.keySecondary) {
                            if (chartBase.crossfilterGrouping.keySecondary.valueType === KeyMetricManager.ValueType.DateTime) {
                                key = chartBase.crossfilterGrouping.keySecondary.shortFormatFunc(moment(Number(key)));
                            } else {
                                key = chartBase.crossfilterGrouping.keySecondary.shortFormatFunc(key);
                            }
                        }
                        items.push({
                            value: pgv.values[i].value,
                            key: key
                        });
                    });
                    const min = Math.min.apply(null, items.map(i => i.value));
                    const max = Math.max.apply(null, items.map(i => i.value));
                    this.outerMax = Math.max.apply(null, [max, this.outerMax]);
                    // for now hard coding to our use case
                    ret.push({
                        index: i,
                        label: sgv.label,
                        values: {
                            Q1: min,
                            Q2: Util.median(items.map(i => i.value).sort((f, s) => f - s)),
                            Q3: max,
                            whisker_low: min,
                            whisker_high: max,
                            outliers: items
                        }
                    });
                });
            }

            return ret;
        };

        super.init($.proxy((c: any) => {
            // make other chart specific alterations after init
            var chart: nvd3.IBoxPlotChart = c.chart;

            // rangeOnlyBoxPlot chart expects either 1 metric and a secondary key or no secondary key and multiple metrics
            if (chartBase.crossfilterGrouping.keySecondary && chartBase.crossfilterGrouping.metrics.length > 1) {
                console.log(Error(`Expecting either 1 metric and a secondary key or no secondary key and multiple metrics. Passed
                    ${chartBase.crossfilterGrouping.keySecondary ? " a" : " no"} secondary key and ${this.chartBase.crossfilterGrouping.metrics.length} metrics.`));
            }
            chart.yDomain = [0, this.outerMax * 1.1];

            if (chartBase.maxBoxWidth) {
                chart.maxBoxWidth = chartBase.maxBoxWidth;
            }

            // set uyp outliers (points)
            chart.outlierValue = (d, i, j) => { return d.value; };
            chart.outlierLabel = $.proxy((d, i, j) => {
                // assumes all metrics have the same format
                return `${d.key}: ${this.chartBase.crossfilterGrouping.metrics[0].shortFormatFunc(d.value)}`;
            }, this);
            if (chartBase.outlierColorAccessor) {
                chart.outlierColor = $.proxy((d, i, j) => {
                    return (<IRangeOnlyBoxPlotChart<T>>this.chartBase).outlierColorAccessor(d.key, i);
                }, this);
            }
            // set up tool tips
            chart.tooltip.contentGenerator = $.proxy((d: any) => {
                return Util.rangeOnlyBoxPlotContentGenerator(d, (<IRangeOnlyBoxPlotChart<T>>this.chartBase).maxTooltipKeyLen);
            }, this);
        }, this));

        // make other chart specific alterations after init
    }
}