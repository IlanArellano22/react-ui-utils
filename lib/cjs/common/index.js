"use strict";
exports.__esModule = true;
exports.Sleep = void 0;
var Sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.Sleep = Sleep;
//# sourceMappingURL=index.js.map