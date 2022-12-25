"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewManagerComponent = void 0;
const react_1 = __importDefault(require("react"));
const comp_1 = require("./comp");
const MODAL_LIMIT = 3;
class ViewManagerComponent extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.showView = (render, props) => {
            return new Promise((resolve) => {
                if (this.state.views.length > MODAL_LIMIT) {
                    resolve(undefined);
                    return;
                }
                const currId = this.state.nextId;
                const entry = {
                    id: currId,
                    render: render,
                    props: Object.assign({ onClose: this.handleClose(currId, resolve) }, (props || {})),
                };
                this.addEntry(entry);
            });
        };
        this.showViewSync = (render, props) => {
            if (this.state.views.length > MODAL_LIMIT)
                return { close: (() => this.removeAll()).bind(this) };
            const currId = this.state.nextId;
            let result;
            const entry = {
                id: currId,
                render: render,
                props: Object.assign(Object.assign({}, (props || {})), { onClose: (res) => {
                        result = res;
                    } }),
            };
            this.addEntry(entry);
            return { close: this.handleCloseSync(currId, result) };
        };
        this.removeAllEntries = () => {
            this.removeAll();
        };
        this.removeAll = () => {
            if (this.state.views.length === 0)
                return;
            this.setState(() => ({ views: [] }));
        };
        this.removeSomeEntries = (condition) => {
            if (this.state.views.length === 0)
                return;
            this.setState((prev) => ({ views: prev.views.filter(condition) }));
        };
        this.addEntry = (entry) => {
            this.setState((prev) => ({
                views: prev.views.concat(entry),
                nextId: prev.nextId + 1,
            }));
        };
        this.removeEntry = (id) => {
            this.setState((prev) => ({
                views: prev.views.filter((view) => view.id !== id),
            }));
        };
        this.handleClose = (id, resolve) => (result) => {
            resolve(result);
            this.removeEntry(id);
        };
        this.handleCloseSync = (id, result) => () => {
            this.removeEntry(id);
            return result;
        };
        this.state = {
            views: [],
            nextId: 0,
        };
    }
    render() {
        return react_1.default.createElement(comp_1.ViewMainComponent, Object.assign({}, this.state));
    }
}
exports.ViewManagerComponent = ViewManagerComponent;
//# sourceMappingURL=manager.js.map