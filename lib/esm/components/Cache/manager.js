import { __extends } from "tslib";
import React, { PureComponent } from "react";
import { CacheContext } from "./context";
import { cacheResourceFuncs } from "./logic";
var ResourceComponentManager = /** @class */ (function (_super) {
    __extends(ResourceComponentManager, _super);
    function ResourceComponentManager(props) {
        var _this = _super.call(this, props) || this;
        _this.cacheResource = function (name, resource, resourceConf) {
            var _a = _this.context, getState = _a.getState, dispatch = _a.dispatch;
            var getResource = function () { var _a; return ((_a = getState()[name]) === null || _a === void 0 ? void 0 : _a.cache) || {}; };
            var depends = resourceConf.depends || [];
            var dispatchResource = function (ac) {
                if (ac.type == "clear") {
                    //Si es limpiar el resource, lanzamos una acción de limpiado recursiva para limpiar este y todos los demás resources
                    dispatch({
                        type: "clearRec",
                        payload: {
                            resource: name
                        }
                    });
                    return;
                }
                dispatch({
                    type: "resource",
                    payload: {
                        resource: name,
                        depends: depends,
                        action: ac
                    }
                });
            };
            var retResource = cacheResourceFuncs(getResource, dispatchResource, { maxSize: 1 }, resource, resourceConf);
            return {
                name: name,
                funcs: retResource,
                depends: depends
            };
        };
        return _this;
    }
    ResourceComponentManager.prototype.render = function () {
        return React.createElement(React.Fragment, null);
    };
    // @ts-ignore: Unreachable code error
    ResourceComponentManager.contextType = CacheContext;
    return ResourceComponentManager;
}(PureComponent));
export { ResourceComponentManager };
//# sourceMappingURL=manager.js.map