/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class NudgeDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    url: string;
    apps: any[];
    apiKey: any;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    _request(request: any): any;
    query(options: any): any;
    _parseNudgeMetrics(appName: any, data: any): {
        target: any;
        datapoints: any[];
    };
    getOptions(): void;
    annotationQuery(options: any): void;
    metricFindQuery(appId: any): any[];
    testDatasource(): any;
    getApplications(): any;
}
