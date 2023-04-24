import { __extends } from "tslib";
var BaseHandler = /** @class */ (function () {
    function BaseHandler() {
    }
    BaseHandler.prototype.getDeepCopy = function () {
        return JSON.parse(JSON.stringify(this.value));
    };
    return BaseHandler;
}());
export { BaseHandler };
var ValueHandler = /** @class */ (function (_super) {
    __extends(ValueHandler, _super);
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
export { ValueHandler };
//# sourceMappingURL=ValueHandler.js.map