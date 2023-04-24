import { __assign, __spreadArray } from "tslib";
import React, { createContext, useReducer, } from "react";
var CACHE_INITIAL = {};
var INITIAL_CACHE_CONTEXT = {
    getState: function () { return CACHE_INITIAL; },
    dispatch: function () { }
};
export var emptyFunctionCache = { entries: [] };
export var CacheContext = createContext(INITIAL_CACHE_CONTEXT);
export var errorFunctionCache = function (err) { return ({
    entries: [],
    error: err
}); };
export function setCacheEntry(cache, config, entry) {
    var index = cache.entries.findIndex(function (x) { return x.args === entry.args; });
    if (index !== -1) {
        return {
            entries: cache.entries.map(function (x, i) { return (i === entry.id ? entry : x); })
        };
    }
    return {
        entries: __spreadArray([entry], cache.entries.slice(0, config.maxSize - 1), true)
    };
}
export function setExistingCacheEntryByIndex(cache, index, getNewEntry) {
    if (index < 0 || index >= cache.entries.length) {
        throw new Error("Indice fuera de rango");
    }
    return {
        entries: cache.entries.map(function (x, i) { return (i === index ? getNewEntry(x) : x); })
    };
}
export function CacheFuncReducer(cache, action) {
    switch (action.type) {
        case "clear":
            return emptyFunctionCache;
        case "error":
            return errorFunctionCache(action.payload.error);
        case "setEntry":
            return setCacheEntry(cache, action.payload.config, action.payload.entry);
        case "resolvePromise":
            return setExistingCacheEntryById(cache, action.payload.id, function (x) { return (__assign(__assign({}, x), { value: __assign(__assign({}, x.value), { payload: action.payload.value }) })); });
        default:
            return cache;
    }
}
export function setExistingCacheEntryById(cache, id, getNewEntry) {
    var index = cache.entries.findIndex(function (x) { return x.id === id; });
    if (index === null || index === undefined)
        return cache;
    return setExistingCacheEntryByIndex(cache, index, getNewEntry);
}
export var cacheReducer = function (cache, action) {
    var _a;
    switch (action.type) {
        case "clear":
            return {};
        case "func":
            return __assign(__assign({}, cache), (_a = {}, _a[action.payload.func] = CacheFuncReducer((cache[action.payload.func] || {}), action.payload.action), _a));
    }
};
var reducer = function (state, action) {
    var _a;
    switch (action.type) {
        case "clearRec":
            return CACHE_INITIAL;
        case "clearRec":
            return state;
        case "resource":
            return __assign(__assign({}, state), (_a = {}, _a[action.payload.resource] = {
                cache: {},
                depends: action.payload.depends
            }, _a));
        default:
            return state;
    }
};
export var CacheResourceProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(reducer, {}), state = _b[0], dispatch = _b[1];
    var getState = function () { return state; };
    return (React.createElement(CacheContext.Provider, { value: { getState: getState, dispatch: dispatch } }, children));
};
//# sourceMappingURL=context.js.map