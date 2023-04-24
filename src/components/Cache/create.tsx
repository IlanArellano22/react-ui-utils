import createUncontrolledClassComponent from "../uncontrolled";
import { CacheConfig, NamedResource, Resource } from "../../types/Cache";
import { ResourceComponentManager } from "./manager";

const cacheResource = <T extends Resource<string>, TName extends string>(
  instance: ResourceComponentManager,
  name: TName,
  resource: T,
  resourceConf: CacheConfig<Extract<keyof T, string>>
): NamedResource<T, TName> => {
  const cacheRet = instance.cacheResource(name, resource, resourceConf);
  return cacheRet || ({} as NamedResource<T, TName>);
};

export const cacheResourceManager = createUncontrolledClassComponent(
  ResourceComponentManager,
  {
    cacheResource,
  }
);
