// module InteractiveCharts.CrossfilterManager {
    "use strict";

    import * as crossfilter from "crossfilter";
    import * as Util from "../shared/util";

    import {
        IKey,
        IKeyMetricManager
    } from "./key-metric-manager";

    import {
        IEventManager
    } from "../shared/event-manager";

    export interface ICrossfilterManager<T> {
        eventManager: IEventManager;
        xfilter: CrossFilter.CrossFilter<T>;
        getKeyMetricManager: () => IKeyMetricManager<T>;
        getData: () => Array<T>;

        // filter string for consumers to filter out the hidden items
        getNonHiddenFilterFunc: (v: T) => boolean;

        // we are managing the dimensions list
        addDimension: (id: any, dimFunc: (d: T) => any) => CrossFilter.Dimension<T, any>;
        addDimensionFromKey: (key: IKey<T>) => CrossFilter.Dimension<T, any>;
        addDimensionsFromKeys: (keys: Array<IKey<T>>) => ICrossfilterManager<T>;
        getDimension: (id: any) => CrossFilter.Dimension<T, any>;
        hasDimension: (id: any) => boolean;

        getGroupValueOfDimension: (groupKey: any, dimensionKey: any) => any;
        getAllNonHiddenItemCount: () => number;
    }

    // manage keys and metrics
    export class CrossfilterManager<T> implements ICrossfilterManager<T> {
        private allNotHiddenDimensionKey: string = "_notHidden_";
        private hidePropertyName: string = "_addedByChartManager_Hide_";
        private dimensions: Array<CrossFilter.Dimension<T, any>> = [];
        public xfilter: CrossFilter.CrossFilter<T>;

        constructor(
            private data: Array<T>,
            indexKeyId: any,
            private keyMetricManager: IKeyMetricManager<T>,
            public eventManager: IEventManager,
            hiddenRows: Array<T> = null) {
            // if we have hidden rows, add them in and tag them
            if (Util.isDefinedAndNotNull(hiddenRows)) {
                hiddenRows.forEach((d) => {
                    d[this.hidePropertyName] = true;
                    data.push(d);
                });
            }

            // set up crossfilter
            this.xfilter = crossfilter(data);

            // build id dimension
            if (!this.hasDimension(indexKeyId)) {
                var idKey: IKey<T> = this.keyMetricManager.getKey(indexKeyId);
                this.addDimension(indexKeyId, idKey.dimensionFunc);
                idKey.min = idKey.dimensionFunc(this.getDimension(indexKeyId).bottom(1)[0]);
                idKey.max = idKey.dimensionFunc(this.getDimension(indexKeyId).top(1)[0]);
            }

            // build hidden dimension
            this.addDimension(this.allNotHiddenDimensionKey, (d: T) => { return !d[this.hidePropertyName]; });
        }

        // what string do we look fro to exclude from crossfilter
        public static getGroupLabelToHide = () => { return "_HideMe_"; };

        public getNonHiddenFilterFunc = (v: T): boolean => {
            return v[this.hidePropertyName] === undefined || v[this.hidePropertyName] === false;
        };

        public getKeyMetricManager() {
            return this.keyMetricManager;
        };

        public getData() {
            return this.data;
        };

        // have we already added this dimension?
        public hasDimension(id: any) {
            var stringId: string = id.toString();
            var dim: CrossFilter.Dimension<T, any> = this.dimensions[stringId];
            return Util.isDefinedAndNotNull(dim);
        };

        // create a dimension
        public addDimension(id: any, dimFunc: (d: T) => any) {
            var stringId: string = id.toString();

            // warn user if we are overwriting a key
            if (this.hasDimension(stringId)) {
                console.log("Warning, a dimension with the id " + stringId + " already exists, overwriting");
            }

            this.dimensions[stringId] = this.xfilter.dimension(dimFunc);
            return this.dimensions[stringId];
        };

        // create a dimension from a key
        public addDimensionFromKey(key: IKey<T>) {
            var stringId: string = key.id.toString();
            return this.addDimension(key.id, key.dimensionFunc);
        };

        // create a set of dimensions from keys
        public addDimensionsFromKeys(keys: Array<IKey<T>>) {
            keys.forEach((key: IKey<T>) => {
                this.addDimensionFromKey(key);
            });
            return this;
        }

        // get a previously created dimension
        public getDimension(id: any) {
            var stringId: string = id.toString();

            if (!this.hasDimension(stringId)) {
                console.log("Warning, a dimension with the id " + stringId + " was not found");
            }

            return this.dimensions[stringId];
        };

        /**
         * Returns the value corresponding to a group key in a dimension
         * @param groupKey: Identifier for the group
         * @param dimensionKey: Unique identifier for the dimension
         * @returns {any}: Return a group from a dimension
         */
        public getGroupValueOfDimension(groupKey: any, dimensionKey: any): any {
            var groups = this.getDimension(dimensionKey).group().top(Infinity);
            var ret: any = null;
            groups.forEach((group) => {
                if (groupKey === group.key) {
                    ret = group.value;
                    return;
                }
            });
            return ret;
        }

        /**
         * return all items that are not hidden
         * @returns {any}
         */
        public getAllNonHiddenItemCount(): number {
            return this.getGroupValueOfDimension(true, this.allNotHiddenDimensionKey);
        }
    }
// }
