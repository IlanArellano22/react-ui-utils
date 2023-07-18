import { ContextType, PureComponent } from "react";
import {
  CacheConfig,
  NamedResource,
  Resource,
  ResourceCacheAction,
} from "../../types/Cache";
import { CacheContext, getState } from "./context";
import { cacheResourceFuncs } from "./logic";

export class ResourceComponentManager extends PureComponent<any> {
  // @ts-ignore: Unreachable code error
  static contextType = CacheContext;
  declare context: ContextType<typeof CacheContext>;
  constructor(props: any) {
    super(props);
  }

  public cacheResource = <T extends Resource<string>, TName extends string>(
    name: TName,
    resource: T,
    resourceConf: CacheConfig<Extract<keyof T, string>>
  ): NamedResource<T, TName> => {
    const { dispatch } = this.context;
    const getResource = () => {
      const state = getState();
      return state[name]?.cache || {};
    };
    const depends = resourceConf.depends || [];
    const dispatchResource = (ac: ResourceCacheAction<string>) => {
      if (ac.type == "clear") {
        //Si es limpiar el resource, lanzamos una acción de limpiado recursiva para limpiar este y todos los demás resources
        dispatch({
          type: "clearRec",
          payload: {
            resource: name,
          },
        });
        return;
      }
      dispatch({
        type: "resource",
        payload: {
          resource: name,
          depends: depends,
          action: ac,
        },
      });
    };

    const retResource = cacheResourceFuncs(
      getResource,
      dispatchResource,
      { maxSize: 1 },
      resource,
      resourceConf
    );

    return {
      name,
      funcs: retResource,
      depends,
    };
  };

  render() {
    return null;
  }
}
