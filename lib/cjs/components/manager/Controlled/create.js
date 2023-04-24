"use strict";
exports.__esModule = true;
exports.register = void 0;
var tslib_1 = require("tslib");
var manager_1 = require("./manager");
var uncontrolled_1 = (0, tslib_1.__importDefault)(require("../../uncontrolled"));
exports.register = (0, uncontrolled_1["default"])(manager_1.RegisterComponentManager, {
    registerComponent: function (instance, entry) {
        instance.registerComponent(entry);
    },
    changeStatus: function (instance, key, status) {
        instance.changeStatus(key, status);
    },
    getComponentDetails: function (instance, key) {
        var comp = instance.getComponentDetails(key);
        return comp;
    },
    getComponentHandler: function (instance, key) {
        var handler = instance.getComponentHandler(key);
        return handler;
    }
});
//# sourceMappingURL=create.js.map