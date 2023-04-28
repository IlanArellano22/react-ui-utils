"use strict";
exports.__esModule = true;
exports.ControlForm = exports.ControlView = void 0;
var tslib_1 = require("tslib");
var log_1 = require("../../common/log");
var react_1 = tslib_1.__importStar(require("react"));
var common_1 = require("../../common");
var FormComp_1 = require("./FormComp");
exports.ControlView = (0, react_1.forwardRef)(function (props) {
    var _a;
    var Component = props.render;
    var CompProps = (0, react_1.useMemo)(function () { return (0, common_1.omit)(props, "field", "render", "value", "onChange"); }, [props]);
    var value = (_a = props.value) === null || _a === void 0 ? void 0 : _a[props.field];
    var handleChange = function (ev) {
        var value = ev.value || ev.target.value || ev;
        props.onChange(props.field, value);
    };
    if (!Component) {
        if (!(0, common_1.isClientSide)())
            return null;
        return react_1["default"].createElement(FormComp_1.Input, tslib_1.__assign({}, CompProps, { value: value, onChange: handleChange }));
    }
    return react_1["default"].createElement(Component, tslib_1.__assign({}, CompProps, { value: value, onChange: handleChange }));
});
exports.ControlForm = (0, react_1.forwardRef)(function (props, ref) {
    var Component = props.render;
    var _a = (0, react_1.useState)(false), update = _a[0], setUpdate = _a[1];
    var CompProps = (0, react_1.useMemo)(function () { return (0, common_1.omit)(props, "field", "render", "value", "onChange"); }, [props]);
    (0, react_1.useEffect)(function () {
        if (!Component)
            log_1.Log.debug.warn("sdas");
        setUpdate(true);
    }, []);
    var handleSubmit = function (ev) {
        console.log({ internalValue: props.value });
        if (ev.preventDefault)
            ev.preventDefault();
        if (props.onSubmit)
            props.onSubmit(props.value);
    };
    if (update === false)
        return null;
    if (!Component) {
        if ((0, common_1.isClientSide)())
            return react_1["default"].createElement(FormComp_1.Form, tslib_1.__assign({}, CompProps, { onSubmit: handleSubmit }));
        return react_1["default"].createElement(react_1["default"].Fragment, null, props.children);
    }
    return react_1["default"].createElement(Component, tslib_1.__assign({ ref: ref }, CompProps, { onSubmit: handleSubmit }));
});
//# sourceMappingURL=controlView.js.map