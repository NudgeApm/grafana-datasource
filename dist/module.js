System.register(['./datasource', './query_ctrl', './config_ctrl'], function(exports_1) {
    var datasource_1, query_ctrl_1, config_ctrl_1;
    var NudgeAnnotationsQueryCtrl, NudgeQueryOptionsCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            },
            function (config_ctrl_1_1) {
                config_ctrl_1 = config_ctrl_1_1;
            }],
        execute: function() {
            NudgeAnnotationsQueryCtrl = (function () {
                function NudgeAnnotationsQueryCtrl() {
                }
                NudgeAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
                return NudgeAnnotationsQueryCtrl;
            })();
            NudgeQueryOptionsCtrl = (function () {
                function NudgeQueryOptionsCtrl() {
                }
                NudgeQueryOptionsCtrl.templateUrl = 'partials/query.editor.html';
                return NudgeQueryOptionsCtrl;
            })();
            exports_1("Datasource", datasource_1.default);
            exports_1("QueryCtrl", query_ctrl_1.NudgeQueryCtrl);
            exports_1("QueryOptionsCtrl", NudgeQueryOptionsCtrl);
            exports_1("ConfigCtrl", config_ctrl_1.NudgeConfigCtrl);
            exports_1("AnnotationsQueryCtrl", NudgeAnnotationsQueryCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map