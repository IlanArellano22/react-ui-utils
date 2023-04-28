"use strict";
exports.__esModule = true;
exports.createFormManager = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var controlView_1 = require("./controlView");
var EventHandler_1 = require("../../common/classes/EventHandler");
var initialFormCtx = {
    value: undefined,
    itemManager: {
        addEventListenner: function () { },
        removeEventListenner: function () { }
    },
    onChange: undefined,
    validation: {}
};
function createFormManager(initial) {
    var FormCxt = (0, react_1.createContext)(initialFormCtx);
    var Form = /** @class */ (function (_super) {
        tslib_1.__extends(Form, _super);
        function Form(props) {
            var _this = _super.call(this, props) || this;
            _this.handleChange = function (field, value) {
                var _a;
                console.log("change", field, value);
                var newValue = tslib_1.__assign(tslib_1.__assign({}, _this.state.value), (_a = {}, _a[field] = value, _a));
                _this.setState(function () { return ({ value: newValue }); });
                var id = (0, EventHandler_1.getEventId)("change");
                _this.event.setSelectedId(id);
                _this.event.listen(newValue);
            };
            _this.state = {
                value: initial
            };
            _this.event = new EventHandler_1.EventHandler();
            return _this;
        }
        Form.prototype.addEventListenner = function (event, fn) {
            var id = (0, EventHandler_1.getEventId)(event);
            this.event.setSelectedId(id);
            this.event.suscribe(function (value) { return fn(value); }, id);
        };
        Form.prototype.removeEventListenner = function (event) {
            var id = (0, EventHandler_1.getEventId)(event);
            this.event.clear(id);
        };
        Form.prototype.render = function () {
            var value = this.state.value;
            console.log({ formValue: value });
            return (react_1["default"].createElement(FormCxt.Provider, { value: {
                    value: value,
                    // @ts-ignore: Unreachable code error
                    onChange: this.handleChange.bind(this),
                    validation: {},
                    itemManager: {
                        addEventListenner: this.addEventListenner.bind(this),
                        removeEventListenner: this.removeEventListenner.bind(this)
                    }
                } },
                react_1["default"].createElement(controlView_1.ControlForm, tslib_1.__assign({}, this.props, { value: value }))));
        };
        return Form;
    }(react_1.PureComponent));
    function Field(props) {
        return (react_1["default"].createElement(FormCxt.Consumer, null, function (formctx) {
            var _a;
            function handleChange(key, newValue) {
                if (formctx.onChange)
                    formctx.onChange(key, newValue);
            }
            var isDisabled = props.onChange === null || props.disabled;
            return (react_1["default"].createElement(controlView_1.ControlView, tslib_1.__assign({}, props, { value: (_a = formctx.value) === null || _a === void 0 ? void 0 : _a[props.field], onChange: !isDisabled && handleChange, disabled: isDisabled })));
        }));
    }
    function useFormValue() {
        var _a = (0, react_1.useContext)(FormCxt), FormValue = _a.value, itemManager = _a.itemManager;
        var _b = (0, react_1.useState)(function () { return FormValue; }), value = _b[0], setValue = _b[1];
        (0, react_1.useEffect)(function () {
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
exports.createFormManager = createFormManager;
//# sourceMappingURL=index.js.map