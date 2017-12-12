"use strict";

import * as moment from "moment";
import { random } from "d3";
import { CrossfilterManager } from "../lib/index";
import { OriginalCharts } from "./examples/index";

import ChartName = OriginalCharts.ChartName;
import ChartGroupName = OriginalCharts.ChartGroupName;
import ITvReportCharts = OriginalCharts.ITvReportCharts;
import ITestTvAd = OriginalCharts.ITestTvAd;
import TvReportCharts = OriginalCharts.TvReportCharts;

export interface ITvReportCtrl {
    tvReportCharts: ITvReportCharts;
    tvAds: Array<ITestTvAd>;

    // add enums for use in template
    enums: { chartName: {}; chartGroupName: {} };
}

export interface ITvReportCtrlScope extends ng.IScope {
    vm: ITvReportCtrl;
}

export class TvReportCtrl implements ITvReportCtrl {
    scope: ITvReportCtrlScope;

    private showDownloadCsv: boolean = false;
    public tvReportCharts: ITvReportCharts;
    public tvAds: Array<ITestTvAd> = [];
    public generatedTs: any;

    // add enums for use in template
    public enums: { chartName: {}; chartGroupName: {} } = {
        chartName: ChartName,
        chartGroupName: ChartGroupName
    };

    // dependency injection
    public static $inject: Array<string> = ["$httpBackend", "$interval", "$q", "$rootScope", "$scope", "$timeout"];

    constructor($httpBackend: ng.IHttpBackendService,
        $interval: ng.IIntervalService,
        $q: ng.IQService,
        $rootScope: ng.IRootScopeService,
        $scope: ITvReportCtrlScope,
        $timeout: ng.ITimeoutService) {

        $scope.vm = this;
        this.scope = $scope;

        // create nvd3 tsinterfaces
        // this.generatedTs = Core.generateNvd3TsInterfaces(); // put back if we want to regenerate // todo: remove once we have the real nvd3 interfaces

        // code for testing
        let startDate: moment.Moment = moment("2017 01 01", "YYYY MM DD").startOf("week").add(1, "day");
        let maxWeeks: number = 52;
        let weeksInThisReport: number = 26;
        let spots = 800;
        let markets: Array<string> = [
            "National", "National", "National", "National", "National", "National", "National", "National", "National",
            "New York", "Los Angeles", "Chicago", "Philadelphia", "Dallas-Ft. Worth", "San Francisco-Oakland-San Jose", "Boston", "Atlanta",
            "Washington, DC", "Houston", "Detroit", "Phoenix", "Tampa-St. Petersburg", "Seattle-Tacoma", "Minneapolis-St. Paul",
            "Miami-Ft.Lauderdale", "Cleveland-Akron", "Denver", "Orlando-Daytona Beach-Melbourne", "Sacramento-Stockton-Modesto"
        ];
        let dayparts: Array<string> = [
            CrossfilterManager.CrossfilterManager.getGroupLabelToHide(), // HideMe Test
            "0.Morning", "1.Daytime", "2.Early Fringe", "3.Prime Time Access",
            "4.Prime Time", "5.Late News", "6.Late Fringe", "7.Overnight"
        ];
        let networks: Array<string> = ["NBC", "CBS", "QVC", "ABC", "ESPN", "Fox", "HBO", "HSN", "TNT", "NICKELODEON", "SHOWTIME", "USA"];

        let randSpend = random.normal(4000, 1000);
        let randSpendDif = random.normal(0, 1000);
        let randImps = random.normal(4500000, 1125000);
        let randImpsDif = random.normal(0, 1125000);
        let createTestRow = (index: number): ITestTvAd => {
            let spend: number = randSpend();
            let impressions: number = (Math.random() > 0.2) ? randImps() : null;
            let ret: ITestTvAd = <ITestTvAd>{
                date: startDate.clone().add(Math.floor(Math.random() * weeksInThisReport * 7), "days"),
                market: markets[Math.floor(Math.random() * markets.length)],
                daypart: dayparts[Math.floor(Math.random() * dayparts.length - 1)], // test missing daypart fixed with hidden ads
                network: networks[Math.floor(Math.random() * networks.length)],
                spendPlanned: spend,
                impressionsPlanned: impressions,
                spendActual: spend + randSpendDif(),
                impressionsActual: impressions ? impressions + randImpsDif() : null,
                id: index
            };
            ret.cpmPlanned = ret.impressionsPlanned ? ret.spendPlanned / ret.impressionsPlanned * 10000 : null;
            ret.cpmActual = ret.impressionsActual ? ret.spendActual / ret.impressionsActual * 10000 : null;
            return ret;
        };
        let keys = {};
        for (let i = 0; i < spots; i++) {
            let n: ITestTvAd = createTestRow(i);
            let key: string = n.date.format("MM/DD/YYYY") + n.network + n.daypart;
            let keyVal: ITestTvAd = keys[key];
            if (!keyVal) {
                keys[key] = n;
            } else {
                keyVal.spendPlanned += n.spendPlanned;
                keyVal.impressionsPlanned += n.impressionsPlanned;
                keyVal.cpmPlanned = keyVal.impressionsPlanned ? (keyVal.spendPlanned / keyVal.impressionsPlanned * 10000) : null;
                keyVal.spendActual += n.spendActual;
                keyVal.impressionsActual += n.impressionsActual;
                keyVal.cpmActual = keyVal.impressionsActual ? (keyVal.spendActual / keyVal.impressionsActual * 10000) : null;
            }
        }
        for (let d in keys) {
            if (keys.hasOwnProperty(d)) {
                $scope.vm.tvAds.push(keys[d]);
            }
        }

        let hiddenAirings: Array<ITestTvAd> = [];
        // testing FrontEndCreatedSpots
        let createTestFrontEndRow = (index: number): ITestTvAd => {
            let ret: ITestTvAd = <ITestTvAd>{
                id: index,
                date: startDate,
                market: markets[0],
                daypart: dayparts[0],
                network: networks[0],
                spendPlanned: null,
                impressionsPlanned: null,
                spendActual: null,
                impressionsActual: null,
                cpmPlanned: null,
                cpmActual: null
            };
            return ret;
        };
        let hiddenindex = spots;
        // ensure that there is a hidden spot in every week
        for (let week = 0; week < maxWeeks; week++) {
            let ad = createTestFrontEndRow(hiddenindex++);
            ad.date = startDate.clone().add(4 + week * 7, "days");
            hiddenAirings.push(ad);
        }
        // ensure that there is a hidden spot in every daypart
        dayparts.forEach((d) => {
            let ad = createTestFrontEndRow(hiddenindex++);
            ad.daypart = d;
            hiddenAirings.push(ad);
        });

        $scope.vm.tvReportCharts = new TvReportCharts($rootScope, $scope.vm.tvAds, hiddenAirings);
    }
}
