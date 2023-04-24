"use strict";
exports.__esModule = true;
exports.ViewMainComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
function ViewMainComponent(props) {
    var x = props.views;
    if (x.length === 0)
        return null;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, x.map(function (view) {
        var C = view.render;
        return react_1["default"].createElement(C, (0, tslib_1.__assign)({ key: view.id }, view.props));
    })));
}
exports.ViewMainComponent = ViewMainComponent;
//# sourceMappingURL=comp.js.map