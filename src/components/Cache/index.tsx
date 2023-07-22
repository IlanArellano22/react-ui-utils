import React from "react";
import { createCacheContext } from "./context";
import createUncontrolledClassComponent, {
  UncontrolledComponent,
} from "components/uncontrolled";
import {
  ResourceComponentManager,
  ResourceComponentManagerProps,
} from "./manager";
import { CacheConfig, NamedResource, Resource } from "types/Cache";
import { createObjectWithGetters } from "common/format";

type CacheResourceFunc = <T extends Resource<string>, TName extends string>(
  instance: () => ResourceComponentManager,
  name: TName,
  resource: T,
  resourceConf: CacheConfig<Extract<keyof T, string>>
) => NamedResource<T, TName>;

const cacheResource: CacheResourceFunc = (
  instance,
  name,
  resource,
  resourceConf
) => {
  let cacheRet = instance()?.cacheResource(name, resource, resourceConf);
  const funcs = createObjectWithGetters(resource, (key) => {
    const comp = instance();
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

interface ICacheResource
  extends UncontrolledComponent<ResourceComponentManagerProps> {
  cacheResource: CacheResourceFunc;
}

export namespace CacheResource {
  export const createCacheResource = (): ICacheResource => {
    const context = createCacheContext();

    const cacheResourceManager: ICacheResource =
      createUncontrolledClassComponent(
        ResourceComponentManager,
        {
          cacheResource,
        },
        {
          strictMode: false,
        }
      );

    const Component = () => (
      <context.CacheResourceProvider>
        <cacheResourceManager.Component getState={context.getState} />
      </context.CacheResourceProvider>
    );

    return {
      ...cacheResourceManager,
      Component,
    };
  };
}
