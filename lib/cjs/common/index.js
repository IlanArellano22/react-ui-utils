"use strict";
exports.__esModule = true;
exports.omit = exports.Sleep = void 0;
var Sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.Sleep = Sleep;
var omit = function (obj) {
    var omits = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        omits[_i - 1] = arguments[_i];
    }
    var mapObj = new Map(Object.entries(obj));
    for (var _a = 0, omits_1 = omits; _a < omits_1.length; _a++) {
        var key = omits_1[_a];
        mapObj["delete"](key);
    }
    return Object.fromEntries(mapObj);
};
exports.omit = omit;
//# sourceMappingURL=index.js.map