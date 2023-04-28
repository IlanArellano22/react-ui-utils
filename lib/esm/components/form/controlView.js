import { __assign } from "tslib";
import { Log } from "../../common/log";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { isClientSide, omit } from "../../common";
import { Form, Input } from "./FormComp";
export var ControlView = forwardRef(function (props) {
    var _a;
    var Component = props.render;
    var CompProps = useMemo(function () { return omit(props, "field", "render", "value", "onChange"); }, [props]);
    var value = (_a = props.value) === null || _a === void 0 ? void 0 : _a[props.field];
    var handleChange = function (ev) {
        var value = ev.value || ev.target.value || ev;
        props.onChange(props.field, value);
    };
    if (!Component) {
        if (!isClientSide())
            return null;
        return React.createElement(Input, __assign({}, CompProps, { value: value, onChange: handleChange }));
    }
    return React.createElement(Component, __assign({}, CompProps, { value: value, onChange: handleChange }));
});
export var ControlForm = forwardRef(function (props, ref) {
    var Component = props.render;
    var _a = useState(false), update = _a[0], setUpdate = _a[1];
    var CompProps = useMemo(function () { return omit(props, "field", "render", "value", "onChange"); }, [props]);
    useEffect(function () {
        if (!Component)
            Log.debug.warn("sdas");
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
        if (isClientSide())
            return React.createElement(Form, __assign({}, CompProps, { onSubmit: handleSubmit }));
        return React.createElement(React.Fragment, null, props.children);
    }
    return React.createElement(Component, __assign({ ref: ref }, CompProps, { onSubmit: handleSubmit }));
});
//# sourceMappingURL=controlView.js.map