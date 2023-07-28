import createUncontrolledClassComponent, {
  UncontrolledComponent,
  UncontrolledContext,
} from "@utils/components/uncontrolled";
import {
  ResourceComponentManager,
  ResourceComponentManagerProps,
} from "./manager";
import { CacheConfig, NamedResource, Resource } from "@utils/types/Cache";
import { createObjectWithGetters } from "@utils/common/format";
import { reducer } from "./logic/context";

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
    const cacheResourceManager: ICacheResource =
      createUncontrolledClassComponent(
        ResourceComponentManager,
        {
          cacheResource,
        },
        {
          strictMode: false,
          contextOptions: {
            initialValues: {},
            reducer: reducer as UncontrolledContext["reducer"],
          },
        }
      );

    return cacheResourceManager;
  };
}
