"use strict";
exports.__esModule = true;
exports.ControlForm = exports.ControlView = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var common_1 = require("../../common");
exports.ControlView = (0, react_1.forwardRef)(function (props) {
    var _a;
    var Component = props.render;
    if (!Component)
        throw new Error("El field para la props ".concat(String(props.field), " no se ha asignado un render para que pueda pintarse"));
    var CompProps = (0, common_1.omit)(props, "field", "render", "value", "onChange");
    var value = (_a = props.value) === null || _a === void 0 ? void 0 : _a[props.field];
    var handleChange = function (ev) {
        var value = ev.value || ev.target.value || ev;
        props.onChange(props.field, value);
    };
    return (react_1["default"].createElement(Component, (0, tslib_1.__assign)({}, CompProps, { key: 2, value: value, onChange: handleChange })));
});
exports.ControlForm = (0, react_1.forwardRef)(function (props, ref) {
    var Component = props.render;
    var CompProps = (0, common_1.omit)(props, "field", "render", "value", "onChange");
    var handleSubmit = function (ev) {
        if (ev.preventDefault)
            ev.preventDefault();
        if (props.onSubmit)
            props.onSubmit(props.value);
    };
    if (!Component)
        return react_1["default"].createElement(react_1["default"].Fragment, null, props.children);
    return react_1["default"].createElement(Component, (0, tslib_1.__assign)({ ref: ref }, CompProps, { onSubmit: handleSubmit }));
});
//# sourceMappingURL=controlView.js.map