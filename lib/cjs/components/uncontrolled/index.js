"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
/**Genera una React Class Component cuyos methodos pueden ser manipulados por otros componentes sin necesidad de estar controlado por props */
function createUncontrolledClassComponent(Comp, methods) {
    var instance = null;
    var handleRef = function (x) {
        instance = x;
    };
    var isInstanceMounted = function () { return !!instance; };
    var Component = function (props) { return (react_1["default"].createElement(Comp, (0, tslib_1.__assign)({}, (props !== null && props !== void 0 ? props : {}), { ref: handleRef }))); };
    var final = Object.fromEntries(Object.entries(methods).map(function (method) {
        var k = method[0], func = method[1];
        var newFunc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!instance)
                throw Error("El componente aun no ha sido inicializado");
            return func.apply(void 0, (0, tslib_1.__spreadArray)([instance], args, false));
        };
        return [k, newFunc];
    }));
    return (0, tslib_1.__assign)({ Component: Component, isInstanceMounted: isInstanceMounted }, final);
}
exports["default"] = createUncontrolledClassComponent;
//# sourceMappingURL=index.js.map