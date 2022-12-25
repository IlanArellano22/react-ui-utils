"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewManager = void 0;
const react_1 = __importDefault(require("react"));
const manager_1 = require("./manager");
const NOT_INSTANCE_ERROR = "El componente aun no ha sido añadido al arbol de componentes o no esta siendo accesible";
let i = 0;
function createViewManager() {
    let instance = undefined;
    let queue = [];
    const processQueue = () => {
        while (instance && queue.length > 0) {
            const value = queue.pop();
            if (value)
                value(instance);
        }
    };
    const handleRef = (x) => {
        instance = x;
        processQueue();
    };
    const Viewer = () => react_1.default.createElement(manager_1.ViewManagerComponent, { ref: handleRef });
    const show = (render, props) => {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        return new Promise((resolve) => {
            queue.push((i) => i.showView(render, props).then((x) => resolve(x)));
            processQueue();
        });
    };
    const showSync = (render, props) => {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        const value = instance.showViewSync(render, props);
        queue = [];
        return value;
    };
    const removeAllEntries = () => {
        if (!instance)
            throw new Error(NOT_INSTANCE_ERROR);
        queue.push((i) => i.removeAllEntries());
        processQueue();
    };
    return { Viewer, show, removeAllEntries, showSync };
}
exports.createViewManager = createViewManager;
//# sourceMappingURL=create.js.map