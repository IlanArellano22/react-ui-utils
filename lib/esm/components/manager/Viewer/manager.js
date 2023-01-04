import { __assign, __extends } from "tslib";
import React from "react";
import { ViewMainComponent, } from "./comp";
var MODAL_LIMIT = 3;
var ViewManagerComponent = /** @class */ (function (_super) {
    __extends(ViewManagerComponent, _super);
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
                    props: __assign({ onClose: _this.handleClose(currId, resolve) }, (props || {}))
                };
                _this.addEntry(entry);
            });
        };
        _this.showViewSync = function (render, props) {
            if (_this.state.views.length > MODAL_LIMIT)
                return { close: (function () { return _this.removeAll(); }).bind(_this) };
            var currId = _this.state.nextId;
            var result;
            var entry = {
                id: currId,
                render: render,
                props: __assign(__assign({}, (props || {})), { onClose: function (res) {
                        result = res;
                    } })
            };
            _this.addEntry(entry);
            return { close: _this.handleCloseSync(currId, result) };
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
        return React.createElement(ViewMainComponent, __assign({}, this.state));
    };
    return ViewManagerComponent;
}(React.PureComponent));
export { ViewManagerComponent };
//# sourceMappingURL=manager.js.map