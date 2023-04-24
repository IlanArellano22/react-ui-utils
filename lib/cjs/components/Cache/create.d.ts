import { CacheConfig, NamedResource, Resource } from "../../types/Cache";
export declare const cacheResourceManager: {
    cacheResource: (name: string, resource: Resource<string>, resourceConf: CacheConfig<string>) => NamedResource<Resource<string>, string>;
} & import("../uncontrolled").UncontrolledComponent<any>;
