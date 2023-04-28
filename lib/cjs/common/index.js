"use strict";
exports.__esModule = true;
exports.isDebug = exports.isClientSide = exports.isPromiseLike = exports.mapObject = exports.omit = exports.Sleep = void 0;
var tslib_1 = require("tslib");
var Sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.Sleep = Sleep;
/**Devuelve un objeto eliminando todas las keys seleccionadas */
var omit = function (obj) {
    var omits = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        omits[_i - 1] = arguments[_i];
    }
    return omits.reduce(function (prev, curr) {
        var _a = prev, _b = curr, omitted = _a[_b], rest = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest;
    }, obj);
};
exports.omit = omit;
function mapObject(obj, map) {
    var ret = {};
    for (var key in obj) {
        var value = obj[key];
        ret[key] = map(value, key);
    }
    return ret;
}
exports.mapObject = mapObject;
function isPromiseLike(x) {
    return x && typeof x.then === "function";
}
exports.isPromiseLike = isPromiseLike;
var isClientSide = function () {
    return typeof window !== "undefined" && !!window.document;
};
exports.isClientSide = isClientSide;
var isDebug = function () {
    return typeof process !== "undefined" && process.env.NODE_ENV === "development";
};
exports.isDebug = isDebug;
//# sourceMappingURL=index.js.map