"use strict";
exports.__esModule = true;
exports.cacheResourceFuncs = void 0;
var common_1 = require("common");
var context_1 = require("../context");
var func_1 = require("./func");
function getFuncCacheDispatch(resourceDispatch, key, omit) {
    return function (ac) {
        if (omit)
            return;
        resourceDispatch({
            type: "func",
            payload: {
                func: key,
                action: ac
            }
        });
    };
}
function cacheResourceFuncs(get, dispatch, config, resource, resourceConf) {
    var cacheKeys = (resourceConf && resourceConf.cache) || [];
    var clearKeys = (resourceConf && resourceConf.clear) || [];
    var ret = (0, common_1.mapObject)(resource, function (value, key) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var usarCache = cacheKeys.some(function (x) { return x === key; });
        var limpiar = clearKeys.some(function (x) { return x === key; });
        var onCall = function () {
            if (limpiar) {
                dispatch({ type: "clear", payload: { config: resourceConf || {} } });
            }
        };
        var cache = get();
        //Si no se ocupa usar el cache se realiza la llamada igual pero con un emptyCache y un fDispatch que no hace nada
        var fCache = ((usarCache && cache[key]) || context_1.emptyFunctionCache);
        var fDispatch = getFuncCacheDispatch(dispatch, key, !usarCache);
        return (0, func_1.cacheCall)(fCache, config, fDispatch, value, args, onCall);
    }; });
    return ret;
}
exports.cacheResourceFuncs = cacheResourceFuncs;
//# sourceMappingURL=index.js.map