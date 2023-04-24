"use strict";
exports.__esModule = true;
var react_1 = require("react");
var helpers_1 = require("../helpers");
function useEffectInterval(effect, deps, interval, inmediate) {
    if (inmediate === void 0) { inmediate = false; }
    var intervalRef = (0, react_1.useRef)(new helpers_1.intervalHandler()).current;
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
}
exports["default"] = useEffectInterval;
//# sourceMappingURL=useEffectInterval.js.map