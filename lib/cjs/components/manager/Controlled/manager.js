"use strict";
exports.__esModule = true;
exports.RegisterComponentManager = void 0;
var tslib_1 = require("tslib");
var EventHandler_1 = require("../../../common/classes/EventHandler");
var ValueHandler_1 = require("../../../common/classes/ValueHandler");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var RegisterComponentManager = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(RegisterComponentManager, _super);
    function RegisterComponentManager(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            components: []
        };
        _this.componentMountEvents = new ValueHandler_1.ValueHandler([]);
        return _this;
    }
    RegisterComponentManager.prototype.registerComponent = function (entry) {
        this.addEntry(entry);
    };
    RegisterComponentManager.prototype.changeStatus = function (key, status) {
        var index = this.state.components.findIndex(function (x) { return x.key === key; });
        if (index === -1)
            return;
        this.modifyEntry((0, tslib_1.__assign)((0, tslib_1.__assign)({}, this.state.components[index]), { status: status }), index);
    };
    RegisterComponentManager.prototype.modifyEntry = function (entry, index) {
        var newState = (0, tslib_1.__spreadArray)([], this.state.components, true);
        newState[index] = entry;
        this.setState({ components: newState });
        console.log("unmounted", { components: newState });
        if (entry.status === "unmounted" && this.componentMountEvents) {
            var MountRef = this.getComponentHandler(entry.key);
            if (MountRef) {
                MountRef.event.listen();
                MountRef.event.clear();
            }
        }
    };
    RegisterComponentManager.prototype.getComponentDetails = function (key) {
        console.log({ key: key, components: this.state.components });
        return this.state.components.find(function (comp) { return (comp === null || comp === void 0 ? void 0 : comp.key) === key; });
    };
    RegisterComponentManager.prototype.getComponentHandler = function (key) {
        return this.componentMountEvents.get().find(function (x) { return x.key === key; });
    };
    RegisterComponentManager.prototype.addEntry = function (entry) {
        if (this.state.components.some(function (x) { return x.key === entry.key; })) {
            this.setState(function (prev) { return ({
                components: prev.components.map(function (x) {
                    if (x.key === entry.key)
                        return entry;
                    return x;
                })
            }); });
            return;
        }
        this.setState(function (prev) { return ({
            components: prev.components.concat(entry)
        }); });
        if (this.componentMountEvents) {
            this.componentMountEvents.set(this.componentMountEvents.get().concat({
                key: entry.key,
                event: new EventHandler_1.EventHandler()
            }));
        }
        console.log({
            entry: entry,
            events: this.componentMountEvents
        });
    };
    RegisterComponentManager.prototype.render = function () {
        return react_1["default"].createElement(react_1["default"].Fragment, null);
    };
    return RegisterComponentManager;
}(react_1.PureComponent));
exports.RegisterComponentManager = RegisterComponentManager;
//# sourceMappingURL=manager.js.map