import { __assign, __spreadArray } from "tslib";
import React from "react";
/**Genera una React Class Component cuyos methodos pueden ser manipulados por otros componentes sin necesidad de estar controlado por props */
export default function createUncontrolledClassComponent(Comp, methods) {
    var instance = null;
    var handleRef = function (x) {
        instance = x;
    };
    var isInstanceMounted = function () { return !!instance; };
    var Component = function (props) { return (React.createElement(Comp, __assign({}, (props !== null && props !== void 0 ? props : {}), { ref: handleRef }))); };
    var final = Object.fromEntries(Object.entries(methods).map(function (method) {
        var k = method[0], func = method[1];
        var newFunc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!instance)
                throw Error("El componente aun no ha sido inicializado");
            return func.apply(void 0, __spreadArray([instance], args, false));
        };
        return [k, newFunc];
    }));
    return __assign({ Component: Component, isInstanceMounted: isInstanceMounted }, final);
}
//# sourceMappingURL=index.js.map