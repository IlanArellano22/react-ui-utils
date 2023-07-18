import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer,
} from "react";
import { deepEqual } from "../../common";
import {
  AppCacheAction,
  CacheEntry,
  CacheResource,
  CacheResourceConfig,
  CacheState,
  FunctionCache,
  FunctionCacheAction,
  ResourceCacheAction,
} from "../../types/Cache";

interface CacheContextProps {
  dispatch: Dispatch<AppCacheAction>;
}

const CACHE_INITIAL = {} as CacheState;

const INITIAL_CACHE_CONTEXT: CacheContextProps = {
  dispatch: () => {},
};

export const emptyFunctionCache: FunctionCache = { entries: [] };

export const CacheContext = createContext(INITIAL_CACHE_CONTEXT);

export const errorFunctionCache: (err: Error) => FunctionCache = (err) => ({
  entries: [],
  error: err,
});

export function setCacheEntry(
  cache: FunctionCache,
  config: CacheResourceConfig,
  entry: CacheEntry
): FunctionCache {
  const index = (cache.entries || []).findIndex((x) =>
    deepEqual(x.args, entry.args)
  );
  if (index !== -1) {
    return {
      entries: cache.entries.map((x, i) => (i === entry.id ? entry : x)),
    };
  }

  const newEntries = [
    entry,
    ...(cache.entries || []).slice(0, config.maxSize - 1),
  ];

  return {
    entries: newEntries,
  };
}

export function setExistingCacheEntryByIndex(
  cache: FunctionCache,
  index: number,
  getNewEntry: (old: CacheEntry) => CacheEntry
): FunctionCache {
  if (index < 0 || index >= cache.entries.length) {
    throw new Error("Indice fuera de rango");
  }
  return {
    entries: cache.entries.map((x, i) => (i === index ? getNewEntry(x) : x)),
  };
}

export function CacheFuncReducer(
  cache: FunctionCache,
  action: FunctionCacheAction
): FunctionCache {
  switch (action.type) {
    case "clear":
      return emptyFunctionCache;
    case "error":
      return errorFunctionCache(action.payload.error);
    case "setEntry":
      return setCacheEntry(cache, action.payload.config, action.payload.entry);
    case "resolvePromise":
      return setExistingCacheEntryById(cache, action.payload.id, (x) => ({
        ...x,
        value: {
          ...x.value,
          payload: action.payload.value,
        },
      }));

    default:
      return cache;
  }
}

export function setExistingCacheEntryById(
  cache: FunctionCache,
  id: number,
  getNewEntry: (old: CacheEntry) => CacheEntry
): FunctionCache {
  const index = (cache.entries || []).findIndex((x) => x.id === id);
  if (index === -1) return cache;
  return setExistingCacheEntryByIndex(cache, index, getNewEntry);
}

export const cacheReducer = <T,>(
  state: CacheResource<T>,
  action: ResourceCacheAction<Extract<keyof T, string>>
): CacheResource<T> => {
  switch (action.type) {
    case "clear":
      return {} as CacheResource<T>;
    case "func":
      return {
        ...state,
        [action.payload.func]: CacheFuncReducer(
          (state[action.payload.func] || {})!,
          action.payload.action
        ),
      };
  }
};

const reducer = (
  stateCache: CacheState,
  action: AppCacheAction
): CacheState => {
  switch (action.type) {
    case "clearRec":
      return CACHE_INITIAL;
    case "resource":
      return {
        ...stateCache,
        [action.payload.resource]: {
          cache: cacheReducer<any>(
            stateCache[action.payload.resource]?.cache ||
              ({} as CacheResource<{}>),
            action.payload.action
          ),
          depends: action.payload.depends,
        },
      };
    default:
      return stateCache;
  }
};

let _store: CacheState;

export const getState = () => _store;

export const CacheResourceProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, {} as CacheState);

  _store = state;

  return (
    <CacheContext.Provider value={{ dispatch }}>
      {children}
    </CacheContext.Provider>
  );
};
