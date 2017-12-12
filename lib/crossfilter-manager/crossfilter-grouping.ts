// module InteractiveCharts.CrossfilterManager {
    "use strict";

    import * as d3 from "d3";
    import * as moment from "moment";
    import * as Util from "../shared/util";

    import {
        CrossfilterManager,
        ICrossfilterManager
    } from "./crossfilter-manager";

    import {
        IKey,
        IKeyMetricManager,
        IMetric,
        ValueType
    } from "./key-metric-manager";

    export interface ICrossfilterGrouping<T> {
        dimension: CrossFilter.Dimension<T, any>;
        dimensionSecondary?: CrossFilter.Dimension<T, any>;
        group: CrossFilter.Group<T, any, any>;
        groupsSecondary: Array<CrossFilter.Grouping<any, any>>;
        key: IKey<T>;
        keySecondary: IKey<T>;
        metrics: Array<IMetric<T>>;
    }

    // manage keys and metrics
    export class CrossfilterGrouping<T> implements ICrossfilterGrouping<T> {
        public dimension: CrossFilter.Dimension<T, any>;
        public dimensionSecondary: CrossFilter.Dimension<T, any>;
        public group: CrossFilter.Group<T, any, any>;
        public groupsSecondary: Array<CrossFilter.Grouping<any, any>>;
        public key: IKey<T>;
        public keySecondary: IKey<T>;
        public metrics: Array<IMetric<T>>;
        private reduceFunc: (p: any, v: T, metric: IMetric<T>, isPositive: boolean) => void;
        private filterBins: (sourceGroup: CrossFilter.Group<T, any, any>, predicateFunc: (d: CrossFilter.Grouping<any, any>) => boolean) => CrossFilter.Group<T, any, any>;

        constructor(
            crossfilterManager: ICrossfilterManager<T>,
            public keyId: any,
            public metricIds: Array<any>,
            public keySecondaryId?: any,
            public groupCountOverride?: number, // only usable on number/currency key types
            public minX?: moment.Moment | number,
            public maxX?: moment.Moment | number,
            public minY?: number,
            public maxY?: number) {
            // set key
            this.key = crossfilterManager.getKeyMetricManager().getKey(keyId);
            this.keySecondary = null;
            if (Util.isDefinedAndNotNull(keySecondaryId)) {
                this.keySecondary = crossfilterManager.getKeyMetricManager().getKey(keySecondaryId);
            }
            // build dimensions if not already built by a previous chart
            [this.key, this.keySecondary].forEach((k: IKey<T>) => {
                if (Util.isDefinedAndNotNull(k) && !crossfilterManager.hasDimension(k.id)) {
                    crossfilterManager.addDimension(k.id, k.dimensionFunc);

                    // set min/max per metric if not set by user
                    if (!k.min) {
                        k.min = k.dimensionFunc(crossfilterManager.getDimension(k.id).bottom(1)[0]);
                    }
                    if (!k.max) {
                        k.max = k.dimensionFunc(crossfilterManager.getDimension(k.id).top(1)[0]);
                    }
                }
            });
            this.dimension = crossfilterManager.getDimension(this.key.id);
            this.dimensionSecondary = null;
            if (Util.isDefinedAndNotNull(this.keySecondary)) {
                this.dimensionSecondary = crossfilterManager.getDimension(this.keySecondary.id);
            }

            // collect metrics
            this.metrics = [];
            for (var metricIndex in metricIds) {
                if (metricIds.hasOwnProperty(metricIndex)) {
                    var met: IMetric<T> = crossfilterManager.getKeyMetricManager().getMetric(metricIds[metricIndex]);
                    this.metrics.push(met);
                }
            }

            // if the chart is overriding the standard grouping function, divide the dimension by the desired chunks
            var groupFunc = this.key.groupFunc;
            if (groupCountOverride) { // todo, only allowing an override of the first key for now... not sure there is need for second
                if (this.key.valueType === ValueType.Number) {
                    var localMinX = Util.isDefinedAndNotNull(minX) ? minX : this.key.min;
                    var localMaxX = Util.isDefinedAndNotNull(maxX) ? maxX : this.key.max;
                    var range: number = localMaxX - localMinX;
                    groupFunc = (d: number) => {
                        return localMinX + ((Math.floor((d - localMinX) / range * groupCountOverride) / groupCountOverride) * range);
                    };
                } else {
                    console.log(Error("groupCountOverride is only usable on Number and Currency ValueTypes: " + this.key.valueType));
                }
            }

            // collect the secondary groups to be used in the primary groups reduce
            this.groupsSecondary = null;
            if (Util.isDefinedAndNotNull(this.keySecondary)) {
                this.groupsSecondary = this.dimensionSecondary.group().all();
            }

            // called per row item to add or remove the value from the total
            this.reduceFunc = (p: any, v: T, metric: IMetric<T>, isPositive: boolean) => {
                if (Util.isDefinedAndNotNull(p)) {
                    var scale: number = isPositive ? 1 : -1;
                    var weight: number = metric.reduceWeightFunc(v);
                    p.value[metric.id] = p.value[metric.id] + (metric.reduceFunc(v) * weight) * scale;
                    p.weightTotal[metric.id] = p.weightTotal[metric.id] + weight * scale;
                    // fix rounding error
                    p.value[metric.id] = d3.round(p.value[metric.id], 2);
                    p.weightTotal[metric.id] = d3.round(p.weightTotal[metric.id], 2);
                }
            };

            // Filter out bins by a predicate function on the values
            this.filterBins = (sourceGroup: CrossFilter.Group<T, any, any>, predicateFunc: (d: CrossFilter.Grouping<any, any>) => boolean) => {
                var ret: CrossFilter.Group<T, any, any> = <CrossFilter.Group<T, any, any>>{};

                ret.all = () => { return sourceGroup.all().filter(predicateFunc); };
                ret.top = (k: number) => {
                    var firstTry: Array<CrossFilter.Grouping<any, any>> = sourceGroup.top(k).filter(predicateFunc);
                    var foundDifCount: number = k - firstTry.length;
                    if (foundDifCount > 0) { // this works because we assume only one hideMe bin... if we add more options, we would need to do this in a loop
                        return sourceGroup.top(k + foundDifCount).filter(predicateFunc);
                    }
                    return firstTry;
                };
                // passthroughs
                ret.reduce = <TGroup>(add: (p: TGroup, v: T) => TGroup, remove: (p: TGroup, v: T) => TGroup, initial: () => TGroup) => {
                    return sourceGroup.reduce(add, remove, initial);
                };
                ret.reduceCount = () => { return sourceGroup.reduceCount(); };
                ret.reduceSum = <TGroup>(value: (data: T) => TGroup) => { return sourceGroup.reduceSum(value); };
                ret.order = (value?: CrossFilter.Selector<any>) => { return sourceGroup.order(value); };
                ret.orderNatural = () => { return sourceGroup.orderNatural(); };
                ret.size = () => { return sourceGroup.size(); };
                ret.dispose = () => { return sourceGroup.dispose(); };

                return ret;
            };

            // make group
            var unfilteredGroup = this.dimension.group(groupFunc).reduce(
                // add
                $.proxy(function (p: any, v: T) {
                    if (!p.order) {
                        p.order = this.key.groupFunc(this.key.dimensionFunc(v));
                    }
                    var secondaryGrouping = null;
                    if (Util.isDefinedAndNotNull(this.groupsSecondary)) {
                        secondaryGrouping = p.secondaryGrouping[this.keySecondary.dimensionFunc(v)];
                    }
                    this.metrics.forEach((metric: IMetric<T>) => {
                        this.reduceFunc(p, v, metric, true);
                        // build up secondary grouping if one exists
                        this.reduceFunc(secondaryGrouping, v, metric, true);
                    });

                    return p;
                }, this),
                // remove
                $.proxy(function (p: any, v: T) {
                    var secondaryGrouping = null;
                    if (Util.isDefinedAndNotNull(this.groupsSecondary)) {
                        secondaryGrouping = p.secondaryGrouping[this.keySecondary.dimensionFunc(v)];
                    }
                    this.metrics.forEach((metric: IMetric<T>) => {
                        this.reduceFunc(p, v, metric, false);
                        // build up secondary grouping if one exists
                        this.reduceFunc(secondaryGrouping, v, metric, false);
                    });

                    return p;
                }, this),
                // init
                () => {
                    var p = { value: [], weightTotal: [], order: null, secondaryGrouping: [] };
                    this.metrics.forEach((metric: IMetric<T>) => {
                        p.value[metric.id] = 0;
                        p.weightTotal[metric.id] = 0;
                    });
                    // build up secondary grouping if one exists
                    if (Util.isDefinedAndNotNull(this.groupsSecondary)) {
                        // this is only building placeholders for groups that are in groupsSecondary
                        this.groupsSecondary.forEach((gs: CrossFilter.Grouping<any, any>) => {
                            p.secondaryGrouping[gs.key] = { value: [], weightTotal: [] };
                            this.metrics.forEach((metric: IMetric<T>) => {
                                p.secondaryGrouping[gs.key].value[metric.id] = 0;
                                p.secondaryGrouping[gs.key].weightTotal[metric.id] = 0;
                            });
                        });
                    }
                    return p;
                });

            // remove groups with the key "RemoveMe"
            this.group = this.filterBins(unfilteredGroup, (d: CrossFilter.Grouping<any, any>) => {
                return d.key !== CrossfilterManager.getGroupLabelToHide();
            });
            // todo, add optional settings per chart to hide empty groups or ensure bins exist https://github.com/dc-js/dc.js/wiki/FAQ

            this.group.order((p) => { return p.order; });
        }
    }
// }
