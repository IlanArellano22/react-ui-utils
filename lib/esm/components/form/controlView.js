import { __assign } from "tslib";
import React, { forwardRef } from "react";
import { omit } from "../../common";
export var ControlView = forwardRef(function (props) {
    var _a;
    var Component = props.render;
    if (!Component)
        throw new Error("El field para la props ".concat(String(props.field), " no se ha asignado un render para que pueda pintarse"));
    var CompProps = omit(props, "field", "render", "value", "onChange");
    var value = (_a = props.value) === null || _a === void 0 ? void 0 : _a[props.field];
    var handleChange = function (ev) {
        var value = ev.value || ev.target.value || ev;
        props.onChange(props.field, value);
    };
    return (React.createElement(Component, __assign({}, CompProps, { key: 2, value: value, onChange: handleChange })));
});
export var ControlForm = forwardRef(function (props, ref) {
    var Component = props.render;
    var CompProps = omit(props, "field", "render", "value", "onChange");
    var handleSubmit = function (ev) {
        if (ev.preventDefault)
            ev.preventDefault();
        if (props.onSubmit)
            props.onSubmit(props.value);
    };
    if (!Component)
        return React.createElement(React.Fragment, null, props.children);
    return React.createElement(Component, __assign({ ref: ref }, CompProps, { onSubmit: handleSubmit }));
});
//# sourceMappingURL=controlView.js.map