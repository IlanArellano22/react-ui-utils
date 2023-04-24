import { mapObject } from "common";
import { emptyFunctionCache } from "../context";
import { cacheCall } from "./func";
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
export function cacheResourceFuncs(get, dispatch, config, resource, resourceConf) {
    var cacheKeys = (resourceConf && resourceConf.cache) || [];
    var clearKeys = (resourceConf && resourceConf.clear) || [];
    var ret = mapObject(resource, function (value, key) { return function () {
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
        var fCache = ((usarCache && cache[key]) || emptyFunctionCache);
        var fDispatch = getFuncCacheDispatch(dispatch, key, !usarCache);
        return cacheCall(fCache, config, fDispatch, value, args, onCall);
    }; });
    return ret;
}
//# sourceMappingURL=index.js.map