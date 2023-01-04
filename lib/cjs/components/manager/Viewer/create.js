"use strict";
exports.__esModule = true;
exports.createViewManager = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var manager_1 = require("./manager");
var NOT_INSTANCE_ERROR = "El componente aun no ha sido añadido al arbol de componentes o no esta siendo accesible";
/**Comentario */
function createViewManager(options) {
    var instance = undefined;
    var queue = [];
    var processQueue = function () {
        while (instance && queue.length > 0) {
            var value = queue.pop();
            if (value)
                value(instance);
        }
    };
    var handleRef = function (x) {
        instance = x;
        processQueue();
    };
    var Viewer = function () { return (react_1["default"].createElement(manager_1.ViewManagerComponent, { ref: handleRef, limit: options.limit })); };
    var show = function (render, props) {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        return new Promise(function (resolve) {
            queue.push(function (i) { return i.showView(render, props).then(function (x) { return resolve(x); }); });
            processQueue();
        });
    };
    var showSync = function (render, props) {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        var value = instance.showViewSync(render, props);
        queue = [];
        return value;
    };
    var removeAllEntries = function () {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        queue.push(function (i) { return i.removeAllEntries(); });
        processQueue();
    };
    return { Viewer: Viewer, show: show, removeAllEntries: removeAllEntries, showSync: showSync };
}
exports.createViewManager = createViewManager;
//# sourceMappingURL=create.js.map