import createUncontrolledClassComponent from "../uncontrolled";
import { CacheConfig, NamedResource, Resource } from "../../types/Cache";
import { ResourceComponentManager } from "./manager";
import { createObjectWithGetters } from "../../common/format";

export type CacheResourceType<
  T extends Resource<string>,
  TName extends string
> = (
  name: TName,
  resource: T,
  resourceConf: CacheConfig<Extract<keyof T, string>>
) => NamedResource<T, TName>;

const cacheResource = <T extends Resource<string>, TName extends string>(
  instance: () => ResourceComponentManager,
  name: TName,
  resource: T,
  resourceConf: CacheConfig<Extract<keyof T, string>>
): NamedResource<T, TName> => {
  console.log({ instance });
  let cacheRet = instance()?.cacheResource(name, resource, resourceConf);
  const funcs = createObjectWithGetters(resource, (key) => {
    const comp = instance();
    console.log("getter", cacheRet, comp);
    if (!cacheRet && comp)
      cacheRet = comp.cacheResource(name, resource, resourceConf);
    return cacheRet.funcs?.[key] || {};
  });
  return {
    name,
    funcs,
    depends: resourceConf.depends || [],
  };
};

export const cacheResourceManager = createUncontrolledClassComponent(
  ResourceComponentManager,
  {
    cacheResource,
  },
  {
    strictMode: false,
  }
);
