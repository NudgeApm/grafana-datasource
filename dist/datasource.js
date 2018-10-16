///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['moment'], function(exports_1) {
    var moment_1;
    var NudgeDatasource;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            NudgeDatasource = (function () {
                /** @ngInject */
                function NudgeDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.url = instanceSettings.url + '/api';
                    this.apiKey = instanceSettings.jsonData.api_key;
                }
                NudgeDatasource.prototype._request = function (request) {
                    var options = {
                        url: request.url,
                        params: request.params,
                        data: request.data,
                        headers: {},
                    };
                    if (this.apiKey) {
                        options.headers['Authorization'] = 'Bearer ' + this.apiKey;
                    }
                    // else throw ERROR
                    return this.backendSrv.datasourceRequest(options).then(function (result) {
                        return {
                            response: result.data,
                            app: request.app,
                        };
                    }, function (err) {
                        if (err.status != 0 || err.status >= 300) {
                            if (err.data && err.data.error) {
                                throw { message: 'Nudge response error : ' + err.data.error.title, data: err.data, config: err.config };
                            }
                            else {
                                throw { message: 'Nudge error : ' + err.message, data: err.data, config: err.config };
                            }
                        }
                    });
                };
                NudgeDatasource.prototype.query = function (options) {
                    var self = this;
                    var appReq = new Array();
                    options.targets.forEach(function (target) {
                        if (target.app) {
                            var appId = target.app.id;
                            var request = {
                                url: self.url + '/apps/' + appId + '/metrics/timeSeries',
                                params: {
                                    metrics: 'time,count',
                                    step: options.interval || '1m',
                                    from: options.range.from.format('X'),
                                    to: options.range.to.format('X'),
                                },
                                app: target.app,
                            };
                            appReq.push(request);
                        }
                    });
                    return this.$q(function (resolve, reject) {
                        var mergedResults = {
                            data: new Array(),
                        };
                        var promises = [];
                        appReq.forEach(function (request) {
                            promises.push(self._request(request));
                        });
                        self.$q.all(promises).then(function (data) {
                            data.forEach(function (result) {
                                mergedResults.data.push(self._parseNudgeMetrics(result.app.name, result.response.data));
                            });
                            resolve(mergedResults);
                        });
                    });
                };
                NudgeDatasource.prototype._parseNudgeMetrics = function (appName, data) {
                    var grafanaMetrics = [];
                    var series = [];
                    if (data) {
                        for (var _i = 0; _i < data.length; _i++) {
                            var metric = data[_i];
                            series.push([(metric[1] / metric[2]), moment_1.default(metric[0]).valueOf()]);
                        }
                    }
                    return {
                        target: appName,
                        datapoints: series,
                    };
                };
                NudgeDatasource.prototype.getOptions = function () {
                    console.log("Hello there from getOPtions datasource.ts");
                };
                NudgeDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                // TODO use type UUID https://www.npmjs.com/package/@types/uuid
                NudgeDatasource.prototype.metricFindQuery = function (appId) {
                    return [];
                };
                NudgeDatasource.prototype.testDatasource = function () {
                    var request = {
                        url: this.url + '/status/health',
                    };
                    return this._request(request).then(function (result) {
                        if (result.response.status === 'satisfying') {
                            return { status: 'success', message: 'Data source is working' };
                        }
                        else {
                            return { status: 'error', message: result.error };
                        }
                    });
                };
                NudgeDatasource.prototype.getApplications = function () {
                    var request = {
                        url: this.url + "/apps",
                    };
                    return this._request(request).then(function (result) {
                        if (result && result.response) {
                            return result.response;
                        }
                        else {
                            return [];
                        }
                    });
                };
                return NudgeDatasource;
            })();
            exports_1("default", NudgeDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map