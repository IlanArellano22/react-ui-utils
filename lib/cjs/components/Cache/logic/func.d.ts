import { CacheResourceConfig, FunctionCache, FunctionCacheAction, JSONValue } from "types/Cache";
export declare function cacheCall<TFunc extends (...args: any[]) => any>(cache: FunctionCache, config: CacheResourceConfig, dispatch: (ac: FunctionCacheAction) => void, func: TFunc, args: JSONValue[], onCall: (() => void) | undefined): ReturnType<TFunc>;
