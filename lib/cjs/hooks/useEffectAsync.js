"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useEffectAsync(effect, deps) {
    var res = null;
    (0, react_1.useEffect)(function () {
        effect().then(function (result) { return (res = result); });
        return function () {
            if (res && typeof res === "function")
                res();
        };
    }, deps);
}
exports["default"] = useEffectAsync;
//# sourceMappingURL=useEffectAsync.js.map