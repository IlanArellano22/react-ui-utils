"use strict";
exports.__esModule = true;
exports.createFormManager = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var controlView_1 = require("./controlView");
function createFormManager(initial) {
    var FormCxt = (0, react_1.createContext)(undefined);
    var Form = /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Form, _super);
        function Form(props) {
            var _this = _super.call(this, props) || this;
            _this.handleChange = function (field, value) {
                console.log("change", field, value);
                _this.setState(function (prev) {
                    var _a;
                    return ((0, tslib_1.__assign)((0, tslib_1.__assign)({}, prev), (_a = {}, _a[field] = value, _a)));
                });
            };
            _this.state = {
                value: initial
            };
            return _this;
        }
        Form.prototype.render = function () {
            var value = this.state.value;
            return (react_1["default"].createElement(FormCxt.Provider, { value: {
                    value: value,
                    // @ts-ignore: Unreachable code error
                    onChange: this.handleChange.bind(this),
                    validation: {}
                } },
                react_1["default"].createElement(controlView_1.ControlForm, (0, tslib_1.__assign)({}, this.props))));
        };
        return Form;
    }(react_1.PureComponent));
    function Field(props) {
        return (react_1["default"].createElement(FormCxt.Consumer, null, function (formctx) {
            function handleChange(key, newValue) {
                if (formctx.onChange)
                    formctx.onChange(key, newValue);
            }
            var isDisabled = props.onChange === null || props.disabled;
            return (react_1["default"].createElement(controlView_1.ControlView, (0, tslib_1.__assign)({}, props, { value: formctx.value[props.field], onChange: !isDisabled && handleChange, disabled: isDisabled })));
        }));
    }
    return { Field: Field, Form: Form };
}
exports.createFormManager = createFormManager;
//# sourceMappingURL=index.js.map