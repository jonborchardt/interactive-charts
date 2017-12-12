// module InteractiveCharts.CrossfilterManager {
    "use strict";

    import * as Util from "../shared/util";
    import {
        ILabelKeyValueTuple
    } from "../shared/util";

    // key type enum
    export enum ValueType {
        Number,
        String,
        DateTime
    };


    // abstract key and metric base class
    export interface IAbstractKeyMetric {
        id: string;
        title: string;
        shortFormatFunc: (d: any) => string;
        longFormatFunc: (d: any) => string;
    }


    /**
     * keys represent the domain/dimension of the data (often the x axis)
     */
    export interface IKey<T> extends IAbstractKeyMetric {
        min?: any; // expects date or number
        max?: any; // expects date or number
        valueType: ValueType; // defines min and max type above
        dimensionFunc: (d: T) => any;
        groupFunc: (d: any) => any;
        groupNameLookup?: (d: any, grouping?: any) => string;
    }


    // metrics represent the sum/average/value oof items in a group (many groups in a domain)
    export interface IMetric<T> extends IAbstractKeyMetric {
        valueFunc: (p: ILabelKeyValueTuple) => number;
        reduceFunc: (d: T) => number;
        reduceWeightFunc: (d: T) => number;
    }


    // concrete datetime key
    export class DateTimeKey<T> implements IKey<T> {
        public valueType: ValueType;

        constructor(
            public id: string,
            public title: string,
            public shortFormatFunc: (d: any) => string,
            public longFormatFunc: (d: any) => string,
            public dimensionFunc: (d: T) => any,
            public groupFunc: (d: any) => any,
            public min?: Date,
            public max?: Date
        ) {
            this.valueType = ValueType.DateTime;
        }
    }


    // concrete number key
    export class NumberKey<T> implements IKey<T> {
        public valueType: ValueType;

        constructor(
            public id: string,
            public title: string,
            public shortFormatFunc: (d: any) => string,
            public longFormatFunc: (d: any) => string,
            public dimensionFunc: (d: T) => any,
            public groupFunc: (d: any) => any,
            public min?: Number,
            public max?: Number
        ) {
            this.valueType = ValueType.Number;
        }
    }


    // concrete string key
    export class StringKey<T> implements IKey<T> {
        public valueType: ValueType;
        public groupNameLookup?: (d: any) => string;

        constructor(
            public id: string,
            public title: string,
            public shortFormatFunc: (d: any) => string,
            public longFormatFunc: (d: any) => string,
            public dimensionFunc: (d: T) => any,
            public groupFunc: (d: any) => any
        ) {
            this.valueType = ValueType.String;
            this.groupNameLookup = (d: any, grouping?: any) => {
                if (grouping && grouping.length) {
                    if (d in grouping) {
                        return grouping[d].key;
                    }
                }
                console.log("Warning: group with specified key not found. returning default value.");
                return d;
            };
        }
    }

    // comcrete metric
    export class Metric<T> implements IMetric<T> {
        constructor(
            public id: string,
            public title: string,
            public shortFormatFunc: (d: any) => string,
            public longFormatFunc: (d: any) => string,
            public valueFunc: (p: ILabelKeyValueTuple) => number,
            public reduceFunc: (d: T) => number,
            public reduceWeightFunc: (d: T) => number
        ) {

        }
    }


    export interface IKeyMetricManager<T> {
        addKey: (id: any,
            title: string,
            shortFormatFunc: (d: any) => string,
            dimensionFunc: (d: T) => any,
            groupFunc: (d: any) => any,
            valueType: ValueType,
            min?: any,
            max?: any,
            longFormatFunc?: (d: any) => string) => IKey<T>;

        addCloneKey: (originalId: any,
            cloneId: any,
            cloneDimensionFunc?: (d: T) => any) => IKey<T>;

        addMetric: (id: any,
            title: string,
            shortFormatFunc: (d: any) => string,
            valueFunc: (p: ILabelKeyValueTuple) => number,
            reduceFunc: (d: T) => number,
            reduceWeightFunc: (d: T) => number,
            longFormatFunc?: (d: any) => string) => IMetric<T>;

        getKey: (id: any) => IKey<T>;

        getMetric: (id: any) => IMetric<T>;
    }


    // manage keys and metrics
    export class KeyMetricManager<T> implements IKeyMetricManager<T> {
        private keys: Array<IKey<T>> = [];
        private metrics: Array<IMetric<T>> = [];

        constructor() { };

        // create a new key
        /**
         * Creates a new key whose type depends on the passed in valueType
         * @param id - Unique Identifier for the key in the dimension
         * @param title - Title which can be used in the chart template corresponding to this key
         * @param shortFormatFunc - A formatted string which determines how to display the dimension in a restricted manner.
         * Used in drawing coordinates, tooltips in charts etc
         * @param dimensionFunc - Function which determines how to calculate the individual values for the dimension corresponding to the key
         * @param groupFunc - Function which determines how to perform grouping of values for the given dimension
         * @param valueType - The type of the key Number / String / Datetime etc
         * @param min - determines low end of range of number/date type key
         * @param max - determines high end of range of number/date type key
         * @param longFormatFunc - A formatted string which determines how to display the dimension in a unrestricted manner
         * @returns {IKey<T>} - Key derived from IKey<T> interface
         */
        public addKey = (id: any,
            title: string,
            shortFormatFunc: (d: any) => string,
            dimensionFunc: (d: T) => any,
            groupFunc: (d: any) => any,
            valueType: ValueType,
            min?: any,
            max?: any,
            longFormatFunc?: (d: any) => string) => {

            var stringId: string = id.toString();

            // warn user if we are overwriting a key
            if (this.keys[stringId]) {
                console.log("Warning, a key with the id " + stringId + " already exists, overwriting");
            }

            // use short format if we dont have a long format
            if (!Util.isDefinedAndNotNull(longFormatFunc)) {
                longFormatFunc = shortFormatFunc;
            }

            switch (valueType) {
                case ValueType.DateTime:
                    {
                        this.keys[stringId] = new DateTimeKey(stringId, title, shortFormatFunc, longFormatFunc, dimensionFunc, groupFunc, min, max);
                        return this.keys[stringId];
                    }
                case ValueType.Number:
                    {
                        this.keys[stringId] = new NumberKey(stringId, title, shortFormatFunc, longFormatFunc, dimensionFunc, groupFunc, min, max);
                        return this.keys[stringId];
                    }
                case ValueType.String:
                    {
                        this.keys[stringId] = new StringKey(stringId, title, shortFormatFunc, longFormatFunc, dimensionFunc, groupFunc);
                        return this.keys[stringId];
                    }
                default:
                    {
                        throw new TypeError("Unknown ValueType");
                    }
            }
        };

        // clone an existing key into a new one
        public addCloneKey = (originalId: any,
            cloneId: any,
            cloneDimensionFunc?: (d: T) => any) => {

            var stringOriginalId: string = originalId.toString();
            var stringCloneId: string = cloneId.toString();

            // if the key does not yet exist, throw an error
            var originalKey = this.keys[stringOriginalId];
            if (!Util.isDefinedAndNotNull(originalKey)) {
                throw new SyntaxError("A key with the id " + stringOriginalId + " does not exists, so we cannot clone");
            }

            return this.addKey(stringCloneId,
                originalKey.title,
                originalKey.shortFormatFunc,
                cloneDimensionFunc || originalKey.dimensionFunc,
                originalKey.groupFunc,
                originalKey.valueType,
                originalKey.min,
                originalKey.max,
                originalKey.longFormatFunc);
        };

        /**
         * Create a metric
         * @param id - Unique Identifier for the key in the dimension
         * @param title - Title which can be used in the chart template corresponding to this
         * @param shortFormatFunc - A formatted string which determines how to display the dimension in a restricted manner.
         * @param valueFunc - Function which evaluates individual values of each row in the dimension
         * @param reduceFunc - Performs reduce / aggregation function.  Typically summation
         * @param reduceWeightFunc - Used for performing weighting for the reduce func
         * @param longFormatFunc - A formatted string which determines how to display the dimension in a unrestricted manner
         * @returns {IMetric<T>}
         */
        public addMetric = (id: any,
            title: string,
            shortFormatFunc: (d: any) => string,
            valueFunc: (p: ILabelKeyValueTuple) => number,
            reduceFunc: (d: T) => number,
            reduceWeightFunc: (d: T) => number,
            longFormatFunc?: (d: any) => string) => {

            var stringId: string = id.toString();

            // warn user if we are overwriting a key
            if (this.metrics[stringId]) {
                console.log("Warning, a metric with the id " + stringId + " already exists, overwriting");
            }

            // use short format if we dont have a long format
            if (!Util.isDefinedAndNotNull(longFormatFunc)) {
                longFormatFunc = shortFormatFunc;
            }

            this.metrics[stringId] = new Metric(stringId,
                title,
                shortFormatFunc,
                longFormatFunc,
                valueFunc,
                reduceFunc,
                reduceWeightFunc);

            return this.metrics[stringId];
        };

        /**
         * Gets the key corresponding to the id
         * @param id - Unique identifier for looking up the key
         * @returns {IKey<T>}: Key
         */
        public getKey = (id: any) => {
            var stringId: string = id.toString();
            var key = this.keys[stringId];
            if (!Util.isDefinedAndNotNull(key)) {
                console.log("Warning, a key with the id " + stringId + " was not found");
            }
            return key;
        };

        /**
         * Gets the metric corresponding to id
         * @param id : Unique identifier for looking up the metric
         * @returns {IMetric<T>}: Metric
         */
        public getMetric = (id: any) => {
            var stringId: string = id.toString();
            var metric = this.metrics[stringId];
            if (!Util.isDefinedAndNotNull(metric)) {

                console.log("Warning, a metric with the id " + stringId + " was not found");
            }
            return metric;
        };
    }
// }
