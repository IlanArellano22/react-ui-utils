"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ValueHandler_1 = require("../common/classes/ValueHandler");
/**Hook que maneja un estado interno sin controlar. A diferencia de @see React.useState este hook no actualiza el componente
 * si no que guarda su estado por medio de una referencia que no cambia durante el lifecycle.
 */
function useValueHandler(initial) {
    var value = (0, react_1.useRef)(new ValueHandler_1.ValueHandler(initial instanceof Function ? initial() : initial)).current;
    var get = (0, react_1.useCallback)(function () { return value.get(); }, []);
    var set = (0, react_1.useCallback)(function (newValue, cb) {
        var final = newValue instanceof Function
            ? newValue(value.get())
            : newValue;
        value.set(final);
        if (cb)
            cb(final);
    }, []);
    var getDeepCopy = (0, react_1.useCallback)(function () { return value.getDeepCopy(); }, []);
    return [get, set, { getDeepCopy: getDeepCopy }];
}
exports["default"] = useValueHandler;
//# sourceMappingURL=useValueHandler.js.map