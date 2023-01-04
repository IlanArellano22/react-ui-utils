"use strict";
exports.__esModule = true;
exports.useEffectInterval = void 0;
var react_1 = require("react");
var intervalHandler_1 = require("@app/helpers/intervalHandler");
var useEffectInterval = function (effect, deps, interval, inmediate) {
    if (inmediate === void 0) { inmediate = false; }
    var intervalRef = (0, react_1.useRef)(new intervalHandler_1.intervalHandler()).current;
    (0, react_1.useEffect)(function () {
        var effectRes;
        if (inmediate)
            effectRes = effect();
        intervalRef.set(function () {
            effectRes = effect();
        }, interval);
        return function () {
            if (effectRes && typeof effectRes === "function")
                effectRes();
            intervalRef.clear();
        };
    }, deps);
};
exports.useEffectInterval = useEffectInterval;
//# sourceMappingURL=useEffectInterval.js.map