"use strict";

import * as moment from "moment";

import {
    CrossfilterManager,
    ChartManager,
    EventManager,
    Util
} from "../../lib/index";

// specify data interface
export interface ISimpleData {
    id: number;
    date: moment.Moment;
    user: string;
    amount: number;
    valueArray: Array<number>; // used to simulate a variable number of metrics
}

// specify keys
export enum KeyName {
    Id,
    Day,
    User
}

// specify metrics
export enum MetricName {
    Amount,
    ValueBase // used to simulate a variable number of metrics
}

export class ExampleBuilderService {
    public getSimpleData: () => Array<any>;
    public addSimpleMetrics: (keyMetricManager: CrossfilterManager.IKeyMetricManager<ISimpleData>) => void;
    public addSimpleKeys: (keyMetricManager: CrossfilterManager.IKeyMetricManager<ISimpleData>) => void;
    public signupForFilterEvents: (eventManager: EventManager.EventManager, rootScope: ng.IRootScopeService, callback: () => void) => void;

    static defaultChartWidth: number = 768;
    static defaultChartHeight: number = 200;
    static valueCount: number = 6;
    static getValueMetricName = (num: number): MetricName => {
        return <MetricName>(MetricName.ValueBase * 10 + num);
    };

    static $inject: string[] = [];
    constructor() {
        // populate data
        this.getSimpleData = (): Array<ISimpleData> => {
            const data = [
                { id: 0, date: moment("01/12/16", "MM/DD/YYYY"), user: "Jon", amount: 7.7, valueArray: [] },
                { id: 1, date: moment("01/12/16", "MM/DD/YYYY"), user: "Sam", amount: 13.1, valueArray: [] },
                { id: 2, date: moment("01/12/16", "MM/DD/YYYY"), user: "Jill", amount: 14.2, valueArray: [] },
                { id: 3, date: moment("01/13/16", "MM/DD/YYYY"), user: "Jon", amount: 17.3, valueArray: [] },
                { id: 4, date: moment("01/13/16", "MM/DD/YYYY"), user: "Sam", amount: 19.4, valueArray: [] },
                { id: 5, date: moment("01/13/16", "MM/DD/YYYY"), user: "Jill", amount: 21.5, valueArray: [] },
                { id: 6, date: moment("01/14/16", "MM/DD/YYYY"), user: "Jon", amount: 11.6, valueArray: [] },
                { id: 7, date: moment("01/14/16", "MM/DD/YYYY"), user: "Sam", amount: 2.7, valueArray: [] },
                { id: 8, date: moment("01/14/16", "MM/DD/YYYY"), user: "Jill", amount: 6.8, valueArray: [] },
                { id: 10, date: moment("01/15/16", "MM/DD/YYYY"), user: "Jon", amount: 11.9, valueArray: [] },
                { id: 11, date: moment("01/15/16", "MM/DD/YYYY"), user: "Sam", amount: 1.1, valueArray: [] },
                { id: 12, date: moment("01/15/16", "MM/DD/YYYY"), user: "Jill", amount: 2.2, valueArray: [] }
            ];
            // add in varied valueArray data for more complicated examples
            data.forEach((d, i) => {
                for (var j = 0; j < ExampleBuilderService.valueCount; j++) {
                    d.valueArray[j] = (d.amount * 0.1) + (d.amount * (((i + 1) * (j + 1) * 1234) % 300) / 10.0);
                }
            });
            return data;
        };

        // set up keys
        this.addSimpleMetrics = (keyMetricManager: CrossfilterManager.IKeyMetricManager<ISimpleData>): void => {
            keyMetricManager.addKey(
                KeyName.Id,
                "Id",
                (d: number) => { return "" + d; },
                (d: ISimpleData) => { return d.id; },
                (d: number) => { return d; },
                CrossfilterManager.ValueType.Number
            );
            keyMetricManager.addKey(
                KeyName.User,
                "User",
                (d: string) => { return d; },
                (d: ISimpleData) => { return d.user; },
                (d: string) => { return d; },
                CrossfilterManager.ValueType.String
            );
            keyMetricManager.addKey(
                KeyName.Day,
                "Day",
                (d: Date) => { return moment(d).format("MM/DD/YYYY"); },
                (d: ISimpleData) => { return d.date.clone(); },
                (d: moment.Moment) => { return d.startOf("day"); },
                CrossfilterManager.ValueType.DateTime
            );
        };

        // set up metrics
        this.addSimpleKeys = (keyMetricManager: CrossfilterManager.IKeyMetricManager<ISimpleData>): void => {
            keyMetricManager.addMetric(
                MetricName.Amount,
                "Amount",
                (d: number) => { return Util.commaFormatter[1](d); },
                (p: Util.ILabelKeyValueTuple) => {
                    return p.value.value[MetricName.Amount];
                },
                (d: ISimpleData) => { return d.amount; },
                (d: ISimpleData) => { return 1; },
                (d: number) => { return Util.commaFormatter[2](d); }
            );
            // add metric for each value in valueArray
            for (var j = 0; j < ExampleBuilderService.valueCount; j++) {
                keyMetricManager.addMetric(
                    ExampleBuilderService.getValueMetricName(j),
                    "Value_" + j,
                    (d: number) => { return Util.commaFormatter[1](d); },
                    getValueArrayValueFunc(j),
                    getValueArrayReduceFunc(j),
                    (d: ISimpleData) => { return 1; },
                    (d: number) => { return Util.commaFormatter[2](d); }
                );
            }
        };
        // wrapper functions
        function getValueArrayValueFunc(index: number): any {
            return (p: Util.ILabelKeyValueTuple) => { return p.value.value[ExampleBuilderService.getValueMetricName(index)]; };
        }
        function getValueArrayReduceFunc(index: number): any {
            return (d: ISimpleData) => { return d.valueArray[index]; };
        }

        // if using other charts, you need to listen to the eventManager for filter/rerender events
        // subscribe AFTER charts to ensure to trigger correct refresh
        this.signupForFilterEvents = (eventManager: EventManager.EventManager, rootScope: ng.IRootScopeService, callback?: () => void): void => {
            eventManager.subscribe("filtered", $.proxy(() => {
                if (Util.isDefinedAndNotNull(callback())) {
                    callback();
                }

                var phase: string = rootScope.$$phase;
                if (phase !== "$apply" && phase !== "$digest" && rootScope.$apply) { // $apply not used in angular4
                    rootScope.$apply();
                }
            }, this));
        };
    }
}
