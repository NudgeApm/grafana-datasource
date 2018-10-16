System.register([], function(exports_1) {
    var NudgeSDK;
    return {
        setters:[],
        execute: function() {
            NudgeSDK = (function () {
                function NudgeSDK(settings, backendSrv) {
                    this.backendSrv = backendSrv;
                }
                return NudgeSDK;
            })();
            exports_1("NudgeSDK", NudgeSDK);
        }
    }
});
//# sourceMappingURL=nudge_sdk.js.map