// // module InteractiveCharts.ChartManager.AngularChart {
	"use strict";
//
// 	Modules.charts
// 		.directive("showonhoverparent", () => {
// 			return {
// 				link: (scope, element, attrs) => {
// 					element.parent().bind("mouseenter", () => {
// 						element.show();
// 					});
// 					element.parent().bind("mouseleave", () => {
// 						element.hide();
// 					});
// 				}
// 			};
// 		});
// // }

	export interface ITestInterface {
		testName?: string;
	}

// export class TvNavBar extends BaseAngularDirective {
// 	public templateUrl: string;
// 	constructor() {
// 		super();
//
// 		this.restrict = "EA";
// 		this.templateUrl =  "app/features/common/navbar.tpl.html";
// 		this.scope = true;
// 		this.controller = "tvNavBarController";
// 	}
// }