"use strict";
exports.__esModule = true;
exports.ViewManagerComponent = void 0;
var tslib_1 = require("tslib");
var common_1 = require("@app/common");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var comp_1 = require("./comp");
var MODAL_LIMIT = 3;
var ViewManagerComponent = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ViewManagerComponent, _super);
    function ViewManagerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.showView = function (render, props) {
            return new Promise(function (resolve) {
                if (_this.state.views.length > MODAL_LIMIT) {
                    resolve(undefined);
                    return;
                }
                var currId = _this.state.nextId;
                var entry = {
                    id: currId,
                    render: render,
                    props: (0, tslib_1.__assign)({ onClose: _this.handleClose(currId, resolve) }, (props || {}))
                };
                _this.addEntry(entry);
            });
        };
        _this.handleStartSync = function (entry, options) { return function () {
            if (options) {
                (function () { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                    var _this = this;
                    return (0, tslib_1.__generator)(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!options.delay) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, common_1.Sleep)(options.delay)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                this.addEntry(entry);
                                if (options.duration) {
                                    (0, common_1.Sleep)(options.duration).then(function () {
                                        _this.removeEntry(entry.id);
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
                return;
            }
            _this.addEntry(entry);
        }; };
        _this.showViewSync = function (render, props, options) {
            if (_this.props.limit && _this.state.views.length > _this.props.limit)
                return {
                    close: (function () { return _this.removeAll(); }).bind(_this),
                    start: (function () { return _this.removeAll(); }).bind(_this)
                };
            var currId = _this.state.nextId;
            var result;
            var entry = {
                id: currId,
                render: render,
                props: (0, tslib_1.__assign)((0, tslib_1.__assign)({}, (props || {})), { onClose: function (res) {
                        result = res;
                    } })
            };
            return {
                close: _this.handleCloseSync(currId, result),
                start: _this.handleStartSync(entry, options)
            };
        };
        _this.removeAllEntries = function () {
            _this.removeAll();
        };
        _this.removeAll = function () {
            if (_this.state.views.length === 0)
                return;
            _this.setState(function () { return ({ views: [] }); });
        };
        _this.addEntry = function (entry) {
            _this.setState(function (prev) { return ({
                views: prev.views.concat(entry),
                nextId: prev.nextId + 1
            }); });
        };
        _this.removeEntry = function (id) {
            _this.setState(function (prev) { return ({
                views: prev.views.filter(function (view) { return view.id !== id; })
            }); });
        };
        _this.handleClose = function (id, resolve) { return function (result) {
            resolve(result);
            _this.removeEntry(id);
        }; };
        _this.handleCloseSync = function (id, result) { return function () {
            _this.removeEntry(id);
            return result;
        }; };
        _this.state = {
            views: [],
            nextId: 0
        };
        return _this;
    }
    ViewManagerComponent.prototype.render = function () {
        return react_1["default"].createElement(comp_1.ViewMainComponent, (0, tslib_1.__assign)({}, this.state));
    };
    return ViewManagerComponent;
}(react_1["default"].PureComponent));
exports.ViewManagerComponent = ViewManagerComponent;
//# sourceMappingURL=manager.js.map