"use strict";
exports.__esModule = true;
exports.CacheResourceProvider = exports.cacheReducer = exports.setExistingCacheEntryById = exports.CacheFuncReducer = exports.setExistingCacheEntryByIndex = exports.setCacheEntry = exports.errorFunctionCache = exports.CacheContext = exports.emptyFunctionCache = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var CACHE_INITIAL = {};
var INITIAL_CACHE_CONTEXT = {
    getState: function () { return CACHE_INITIAL; },
    dispatch: function () { }
};
exports.emptyFunctionCache = { entries: [] };
exports.CacheContext = (0, react_1.createContext)(INITIAL_CACHE_CONTEXT);
var errorFunctionCache = function (err) { return ({
    entries: [],
    error: err
}); };
exports.errorFunctionCache = errorFunctionCache;
function setCacheEntry(cache, config, entry) {
    var index = cache.entries.findIndex(function (x) { return x.args === entry.args; });
    if (index !== -1) {
        return {
            entries: cache.entries.map(function (x, i) { return (i === entry.id ? entry : x); })
        };
    }
    return {
        entries: (0, tslib_1.__spreadArray)([entry], cache.entries.slice(0, config.maxSize - 1), true)
    };
}
exports.setCacheEntry = setCacheEntry;
function setExistingCacheEntryByIndex(cache, index, getNewEntry) {
    if (index < 0 || index >= cache.entries.length) {
        throw new Error("Indice fuera de rango");
    }
    return {
        entries: cache.entries.map(function (x, i) { return (i === index ? getNewEntry(x) : x); })
    };
}
exports.setExistingCacheEntryByIndex = setExistingCacheEntryByIndex;
function CacheFuncReducer(cache, action) {
    switch (action.type) {
        case "clear":
            return exports.emptyFunctionCache;
        case "error":
            return (0, exports.errorFunctionCache)(action.payload.error);
        case "setEntry":
            return setCacheEntry(cache, action.payload.config, action.payload.entry);
        case "resolvePromise":
            return setExistingCacheEntryById(cache, action.payload.id, function (x) { return ((0, tslib_1.__assign)((0, tslib_1.__assign)({}, x), { value: (0, tslib_1.__assign)((0, tslib_1.__assign)({}, x.value), { payload: action.payload.value }) })); });
        default:
            return cache;
    }
}
exports.CacheFuncReducer = CacheFuncReducer;
function setExistingCacheEntryById(cache, id, getNewEntry) {
    var index = cache.entries.findIndex(function (x) { return x.id === id; });
    if (index === null || index === undefined)
        return cache;
    return setExistingCacheEntryByIndex(cache, index, getNewEntry);
}
exports.setExistingCacheEntryById = setExistingCacheEntryById;
var cacheReducer = function (cache, action) {
    var _a;
    switch (action.type) {
        case "clear":
            return {};
        case "func":
            return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, cache), (_a = {}, _a[action.payload.func] = CacheFuncReducer((cache[action.payload.func] || {}), action.payload.action), _a));
    }
};
exports.cacheReducer = cacheReducer;
var reducer = function (state, action) {
    var _a;
    switch (action.type) {
        case "clearRec":
            return CACHE_INITIAL;
        case "clearRec":
            return state;
        case "resource":
            return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, state), (_a = {}, _a[action.payload.resource] = {
                cache: {},
                depends: action.payload.depends
            }, _a));
        default:
            return state;
    }
};
var CacheResourceProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(reducer, {}), state = _b[0], dispatch = _b[1];
    var getState = function () { return state; };
    return (react_1["default"].createElement(exports.CacheContext.Provider, { value: { getState: getState, dispatch: dispatch } }, children));
};
exports.CacheResourceProvider = CacheResourceProvider;
//# sourceMappingURL=context.js.map