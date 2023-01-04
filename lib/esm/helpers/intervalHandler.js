var intervalHandler = /** @class */ (function () {
    function intervalHandler() {
        var _this = this;
        this.set = function (callback, ms) {
            _this.interval = setInterval(callback, ms);
        };
        this.clear = function () {
            if (_this.interval)
                clearInterval(_this.interval);
        };
    }
    return intervalHandler;
}());
export { intervalHandler };
//# sourceMappingURL=intervalHandler.js.map