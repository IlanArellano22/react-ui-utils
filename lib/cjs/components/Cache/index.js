"use strict";
exports.__esModule = true;
exports.CacheResourceComponent = exports.cacheResource = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var context_1 = require("./context");
var create_1 = require("./create");
exports.cacheResource = create_1.cacheResourceManager.cacheResource;
var CacheResourceComponent = function () {
    return (react_1["default"].createElement(context_1.CacheResourceProvider, null,
        react_1["default"].createElement(create_1.cacheResourceManager.Component, null)));
};
exports.CacheResourceComponent = CacheResourceComponent;
//# sourceMappingURL=index.js.map