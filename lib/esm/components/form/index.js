import { __assign, __extends } from "tslib";
import React, { createContext, PureComponent } from "react";
import { ControlForm, ControlView } from "./controlView";
export function createFormManager(initial) {
    var FormCxt = createContext(undefined);
    var Form = /** @class */ (function (_super) {
        __extends(Form, _super);
        function Form(props) {
            var _this = _super.call(this, props) || this;
            _this.handleChange = function (field, value) {
                console.log("change", field, value);
                _this.setState(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
                });
            };
            _this.state = {
                value: initial
            };
            return _this;
        }
        Form.prototype.render = function () {
            var value = this.state.value;
            return (React.createElement(FormCxt.Provider, { value: {
                    value: value,
                    // @ts-ignore: Unreachable code error
                    onChange: this.handleChange.bind(this),
                    validation: {}
                } },
                React.createElement(ControlForm, __assign({}, this.props))));
        };
        return Form;
    }(PureComponent));
    function Field(props) {
        return (React.createElement(FormCxt.Consumer, null, function (formctx) {
            function handleChange(key, newValue) {
                if (formctx.onChange)
                    formctx.onChange(key, newValue);
            }
            var isDisabled = props.onChange === null || props.disabled;
            return (React.createElement(ControlView, __assign({}, props, { value: formctx.value[props.field], onChange: !isDisabled && handleChange, disabled: isDisabled })));
        }));
    }
    return { Field: Field, Form: Form };
}
//# sourceMappingURL=index.js.map