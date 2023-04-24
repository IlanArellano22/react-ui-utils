export declare type CacheActions = "cache" | "clear";
export declare type JSONValue = string | number | boolean | {} | any[] | null | undefined;
export declare type CachePayload = JSONValue | PromiseLike<JSONValue>;
export interface CacheValue {
    payload: CachePayload;
    async: boolean;
}
export interface CacheEntry {
    id: number;
    args: JSONValue[];
    value: CacheValue;
}
export interface CacheConfig<IKeys extends string> {
    cache?: IKeys[];
    clear?: IKeys[];
    depends?: string[];
}
export interface FunctionCache {
    entries: CacheEntry[];
    error?: Error;
}
export declare type CacheResource<T> = {
    [key in keyof T]: FunctionCache;
};
export declare type CacheState = {
    [key: string]: {
        cache: CacheResource<any>;
        depends: string[];
    } | undefined;
};
export declare type AppCacheAction = {
    type: "clear";
} | {
    type: "resource";
    payload: {
        resource: string;
        /**Nombres de los resources que dependen de este resource */
        depends: string[];
        action: ResourceCacheAction<any>;
    };
} | {
    type: "clearRec";
    payload: {
        resource: string;
    };
};
export declare type ResourceCacheAction<TKeys extends string> = {
    type: "clear";
    payload: {
        config: CacheConfig<TKeys>;
    };
} | {
    type: "func";
    payload: {
        func: TKeys;
        action: FunctionCacheAction;
    };
};
export declare type FunctionCacheAction = {
    type: "setEntry";
    payload: {
        entry: CacheEntry;
        config: CacheResourceConfig;
    };
} | {
    type: "clear";
} | {
    type: "resolvePromise";
    payload: {
        id: number;
        value: JSONValue;
    };
} | {
    type: "error";
    payload: {
        error: Error;
    };
};
export interface CacheResourceConfig {
    /**Cantidad máxima de elementos en el cache */
    maxSize: number;
}
/**Un objeto de funciones */
export declare type Resource<TKeys extends string> = {
    [K in TKeys]: (...args: any[]) => any;
};
export declare type NamedResource<T extends Resource<string>, TName extends string> = {
    /**Nombre del resource */
    name: TName;
    /**Nombre de los resources que se deben de limpiar al invalidar este resourceks*/
    depends: string[];
    /**Funciones del resource */
    funcs: {
        [K in keyof T]: T[K];
    };
};
export declare type CacheResourceFunc = <T extends Resource<string>, TName extends string>(name: TName, resource: T, resourceConf: CacheConfig<Extract<keyof T, string>>) => NamedResource<T, TName>;