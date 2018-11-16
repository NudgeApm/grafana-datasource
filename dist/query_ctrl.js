///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk', './css/query_editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var NudgeQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {}],
        execute: function() {
            NudgeQueryCtrl = (function (_super) {
                __extends(NudgeQueryCtrl, _super);
                /** @ngInject **/
                function NudgeQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    var defaults = {
                        appId: null,
                        target: 'application',
                        type: 'timeserie'
                    };
                    this.metrics = [
                        { value: 'gen_overview', label: 'App global response time' },
                        { value: 'gen_count', label: 'App global count' }
                    ];
                    lodash_1.default.defaultsDeep(this.target, defaults);
                    this.target.target = defaults.target;
                    this.target.type = defaults.type;
                    this.getApplications();
                    this.toggleMetric();
                }
                NudgeQueryCtrl.prototype.getApplications = function () {
                    var _this = this;
                    this.datasource.getApplications().then(function (apps) {
                        if (apps) {
                            apps = lodash_1.default.map(apps, function (app) {
                                return { name: app.name, id: app.id };
                            });
                            // fix applications to model
                            _this.applications = apps;
                            return apps;
                        }
                    });
                };
                NudgeQueryCtrl.prototype.getOptions = function (query) {
                    return this.datasource.metricFindQuery(query || '');
                };
                // Gets list of metric namespaces from datasource to populate the Metric Value dropdown
                NudgeQueryCtrl.prototype.getMetricValues = function () {
                    var values = ["General", "Count"];
                    return values;
                };
                // Shows the second operand selection if the operator is defined
                NudgeQueryCtrl.prototype.toggleMetric = function () {
                    console.log("echo from toggleOperand2 query_ctrl");
                    if (this.target.app != "") {
                        this.isMetricVisible = true;
                    }
                    else {
                        this.isMetricVisible = false;
                        this.refresh();
                    }
                };
                NudgeQueryCtrl.prototype.onChangeInternal = function () {
                    this.panelCtrl.refresh(); // Asks the panel to refresh data.
                };
                NudgeQueryCtrl.prototype.toggleApplication = function (query) {
                    return this.datasource.metricFindQuery(this.target.app.id);
                };
                NudgeQueryCtrl.templateUrl = 'partials/query.editor.html';
                return NudgeQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("NudgeQueryCtrl", NudgeQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map