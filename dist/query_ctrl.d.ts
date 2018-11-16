/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class NudgeQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    type: any;
    applications: any[];
    app: any;
    isMetricVisible: boolean;
    metrics: any;
    /** @ngInject **/
    constructor($scope: any, $injector: any);
    getApplications(): void;
    getOptions(query: any): any;
    getMetricValues(): string[];
    toggleMetric(): void;
    onChangeInternal(): void;
    toggleApplication(query: any): any;
}
