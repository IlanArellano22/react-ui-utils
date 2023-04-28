import { __assign, __extends } from "tslib";
import React, { createContext, PureComponent, useContext, useEffect, useState, } from "react";
import { ControlForm, ControlView } from "./controlView";
import { EventHandler, getEventId } from "../../common/classes/EventHandler";
var initialFormCtx = {
    value: undefined,
    itemManager: {
        addEventListenner: function () { },
        removeEventListenner: function () { }
    },
    onChange: undefined,
    validation: {}
};
export function createFormManager(initial) {
    var FormCxt = createContext(initialFormCtx);
    var Form = /** @class */ (function (_super) {
        __extends(Form, _super);
        function Form(props) {
            var _this = _super.call(this, props) || this;
            _this.handleChange = function (field, value) {
                var _a;
                console.log("change", field, value);
                var newValue = __assign(__assign({}, _this.state.value), (_a = {}, _a[field] = value, _a));
                _this.setState(function () { return ({ value: newValue }); });
                var id = getEventId("change");
                _this.event.setSelectedId(id);
                _this.event.listen(newValue);
            };
            _this.state = {
                value: initial
            };
            _this.event = new EventHandler();
            return _this;
        }
        Form.prototype.addEventListenner = function (event, fn) {
            var id = getEventId(event);
            this.event.setSelectedId(id);
            this.event.suscribe(function (value) { return fn(value); }, id);
        };
        Form.prototype.removeEventListenner = function (event) {
            var id = getEventId(event);
            this.event.clear(id);
        };
        Form.prototype.render = function () {
            var value = this.state.value;
            console.log({ formValue: value });
            return (React.createElement(FormCxt.Provider, { value: {
                    value: value,
                    // @ts-ignore: Unreachable code error
                    onChange: this.handleChange.bind(this),
                    validation: {},
                    itemManager: {
                        addEventListenner: this.addEventListenner.bind(this),
                        removeEventListenner: this.removeEventListenner.bind(this)
                    }
                } },
                React.createElement(ControlForm, __assign({}, this.props, { value: value }))));
        };
        return Form;
    }(PureComponent));
    function Field(props) {
        return (React.createElement(FormCxt.Consumer, null, function (formctx) {
            var _a;
            function handleChange(key, newValue) {
                if (formctx.onChange)
                    formctx.onChange(key, newValue);
            }
            var isDisabled = props.onChange === null || props.disabled;
            return (React.createElement(ControlView, __assign({}, props, { value: (_a = formctx.value) === null || _a === void 0 ? void 0 : _a[props.field], onChange: !isDisabled && handleChange, disabled: isDisabled })));
        }));
    }
    function useFormValue() {
        var _a = useContext(FormCxt), FormValue = _a.value, itemManager = _a.itemManager;
        var _b = useState(function () { return FormValue; }), value = _b[0], setValue = _b[1];
        useEffect(function () {
            itemManager.addEventListenner("change", function (newValue) {
                setValue(newValue);
            });
            return function () {
                itemManager.removeEventListenner("change");
            };
        }, []);
        return { value: value };
    }
    return { Field: Field, Form: Form, useFormValue: useFormValue };
}
//# sourceMappingURL=index.js.map