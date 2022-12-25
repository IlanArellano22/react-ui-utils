"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewMainComponent = void 0;
const react_1 = __importDefault(require("react"));
function ViewMainComponent(props) {
    const x = props.views;
    if (x.length === 0)
        return null;
    return (react_1.default.createElement(react_1.default.Fragment, null, x.map((view) => {
        const C = view.render;
        return react_1.default.createElement(C, Object.assign({ key: view.id }, view.props));
    })));
}
exports.ViewMainComponent = ViewMainComponent;
//# sourceMappingURL=comp.js.map