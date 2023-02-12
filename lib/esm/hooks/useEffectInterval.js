import { useEffect, useRef } from "react";
import { intervalHandler } from "../helpers";
export var useEffectInterval = function (effect, deps, interval, inmediate) {
    if (inmediate === void 0) { inmediate = false; }
    var intervalRef = useRef(new intervalHandler()).current;
    useEffect(function () {
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
//# sourceMappingURL=useEffectInterval.js.map