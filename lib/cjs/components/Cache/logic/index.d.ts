import { CacheConfig, CacheResource, CacheResourceConfig, Resource, ResourceCacheAction } from "types/Cache";
export declare function cacheResourceFuncs<T extends Resource<string>>(get: () => CacheResource<T>, dispatch: (action: ResourceCacheAction<Extract<keyof T, string>>) => void, config: CacheResourceConfig, resource: T, resourceConf?: CacheConfig<Extract<keyof T, string>>): T;
