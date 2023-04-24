"use strict";
exports.__esModule = true;
exports.ResourceComponentManager = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var context_1 = require("./context");
var logic_1 = require("./logic");
var ResourceComponentManager = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ResourceComponentManager, _super);
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
            var retResource = (0, logic_1.cacheResourceFuncs)(getResource, dispatchResource, { maxSize: 1 }, resource, resourceConf);
            return {
                name: name,
                funcs: retResource,
                depends: depends
            };
        };
        return _this;
    }
    ResourceComponentManager.prototype.render = function () {
        return react_1["default"].createElement(react_1["default"].Fragment, null);
    };
    // @ts-ignore: Unreachable code error
    ResourceComponentManager.contextType = context_1.CacheContext;
    return ResourceComponentManager;
}(react_1.PureComponent));
exports.ResourceComponentManager = ResourceComponentManager;
//# sourceMappingURL=manager.js.map