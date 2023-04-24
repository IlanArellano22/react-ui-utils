"use strict";
exports.__esModule = true;
exports.ValueHandler = exports.BaseHandler = void 0;
var tslib_1 = require("tslib");
var BaseHandler = /** @class */ (function () {
    function BaseHandler() {
    }
    BaseHandler.prototype.getDeepCopy = function () {
        return JSON.parse(JSON.stringify(this.value));
    };
    return BaseHandler;
}());
exports.BaseHandler = BaseHandler;
var ValueHandler = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ValueHandler, _super);
    function ValueHandler(initial) {
        var _this = _super.call(this) || this;
        _this.value = initial;
        return _this;
    }
    ValueHandler.prototype.get = function () {
        return this.value;
    };
    ValueHandler.prototype.set = function (value) {
        this.value = value;
    };
    return ValueHandler;
}(BaseHandler));
exports.ValueHandler = ValueHandler;
//# sourceMappingURL=ValueHandler.js.map