import { __assign } from "tslib";
import React from "react";
export function ViewMainComponent(props) {
    var x = props.views;
    if (x.length === 0)
        return null;
    return (React.createElement(React.Fragment, null, x.map(function (view) {
        var C = view.render;
        return React.createElement(C, __assign({ key: view.id }, view.props));
    })));
}
//# sourceMappingURL=comp.js.map