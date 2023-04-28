import { __rest } from "tslib";
export var Sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
/**Devuelve un objeto eliminando todas las keys seleccionadas */
export var omit = function (obj) {
    var omits = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        omits[_i - 1] = arguments[_i];
    }
    return omits.reduce(function (prev, curr) {
        var _a = prev, _b = curr, omitted = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest;
    }, obj);
};
export function mapObject(obj, map) {
    var ret = {};
    for (var key in obj) {
        var value = obj[key];
        ret[key] = map(value, key);
    }
    return ret;
}
export function isPromiseLike(x) {
    return x && typeof x.then === "function";
}
export var isClientSide = function () {
    return typeof window !== "undefined" && !!window.document;
};
export var isDebug = function () {
    return typeof process !== "undefined" && process.env.NODE_ENV === "development";
};
//# sourceMappingURL=index.js.map