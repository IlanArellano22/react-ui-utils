import React, { Dispatch, PropsWithChildren } from "react";
import { AppCacheAction, CacheEntry, CacheResource, CacheResourceConfig, CacheState, FunctionCache, FunctionCacheAction, ResourceCacheAction } from "../../types/Cache";
interface CacheContextProps {
    getState: () => CacheState;
    dispatch: Dispatch<AppCacheAction>;
}
export declare const emptyFunctionCache: FunctionCache;
export declare const CacheContext: React.Context<CacheContextProps>;
export declare const errorFunctionCache: (err: Error) => FunctionCache;
export declare function setCacheEntry(cache: FunctionCache, config: CacheResourceConfig, entry: CacheEntry): FunctionCache;
export declare function setExistingCacheEntryByIndex(cache: FunctionCache, index: number, getNewEntry: (old: CacheEntry) => CacheEntry): FunctionCache;
export declare function CacheFuncReducer(cache: FunctionCache, action: FunctionCacheAction): FunctionCache;
export declare function setExistingCacheEntryById(cache: FunctionCache, id: number, getNewEntry: (old: CacheEntry) => CacheEntry): FunctionCache;
export declare const cacheReducer: <T>(cache: CacheResource<T>, action: ResourceCacheAction<Extract<keyof T, string>>) => {};
export declare const CacheResourceProvider: ({ children }: PropsWithChildren) => JSX.Element;
export {};
