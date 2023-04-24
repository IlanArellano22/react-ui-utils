"use strict";
exports.__esModule = true;
exports.ViewManagerComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var comp_1 = require("./comp");
var create_1 = require("../Controlled/create");
var common_1 = require("../../../common");
var VIEW_CONTEXT_ID = 0;
var VIEW_CONTEXT_ID_SYNC = 0;
var ViewManagerComponent = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ViewManagerComponent, _super);
    function ViewManagerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.show = function (render, props, context) {
            return new Promise(function (resolve) {
                var currId = _this.state.nextId;
                var entry = {
                    id: currId,
                    render: render,
                    props: (0, tslib_1.__assign)({ onClose: _this.handleClose(currId, resolve) }, (props || {}))
                };
                _this.startModal(entry, resolve, context);
            });
        };
        _this.showSync = function (render, props, context) {
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
                start: function (options) {
                    if (!(options === null || options === void 0 ? void 0 : options.delay))
                        return _this.startModalSync(entry, result, context);
                    (0, common_1.Sleep)(options.delay).then(function () {
                        return _this.startModalSync(entry, result, context);
                    });
                },
                close: _this.handleCloseSync(entry.id, result)
            };
        };
        _this.startModal = function (entry, resolve, context) {
            if (context) {
                var componentDetails = create_1.register.getComponentDetails(context);
                var handler = create_1.register.getComponentHandler(context);
                if (componentDetails &&
                    componentDetails.status === "mounted" &&
                    handler) {
                    _this.addEntry(entry);
                    var context_id = "".concat(context, "_").concat(++VIEW_CONTEXT_ID);
                    handler.event.suscribe(function () {
                        console.log("suscribe");
                        _this.handleClose(entry.id, resolve)(undefined);
                    }, context_id);
                    handler.event.setSelectedId(context_id);
                }
                else {
                    console.warn("No se puede renderizar este modal porque el componente anclado al context no esta disponible en el React Tree");
                    resolve(undefined);
                }
            }
            else {
                _this.addEntry(entry);
            }
        };
        _this.startModalSync = function (entry, result, context) {
            if (context) {
                var componentDetails = create_1.register.getComponentDetails(context);
                var handler = create_1.register.getComponentHandler(context);
                if (componentDetails &&
                    componentDetails.status === "mounted" &&
                    handler) {
                    _this.addEntry(entry);
                    var context_id = "".concat(context, "_sync_").concat(++VIEW_CONTEXT_ID_SYNC);
                    handler.event.suscribe(function () {
                        console.log("suscribe");
                        _this.handleCloseSync(entry.id, result)();
                    }, context_id);
                    handler.event.setSelectedId(context_id);
                }
                else {
                    console.warn("No se puede renderizar este modal porque el componente anclado al context no esta disponible en el React Tree");
                }
            }
            else {
                _this.addEntry(entry);
            }
        };
        _this.removeAllEntries = function () {
            _this.removeAll();
        };
        _this.removeAll = function () {
            if (_this.state.views.length === 0)
                return;
            _this.setState(function () { return ({ views: [] }); });
        };
        _this.removeSomeEntries = function (condition) {
            if (_this.state.views.length === 0)
                return;
            _this.setState(function (prev) { return ({ views: prev.views.filter(condition) }); });
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
        if (this.props.context)
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(create_1.register.Component, null),
                react_1["default"].createElement(comp_1.ViewMainComponent, (0, tslib_1.__assign)({}, this.state))));
        return react_1["default"].createElement(comp_1.ViewMainComponent, (0, tslib_1.__assign)({}, this.state));
    };
    return ViewManagerComponent;
}(react_1["default"].PureComponent));
exports.ViewManagerComponent = ViewManagerComponent;
//# sourceMappingURL=manager.js.map