import { ContextType, PureComponent, type Context } from "react";
import {
  CacheConfig,
  CacheState,
  NamedResource,
  Resource,
  ResourceCacheAction,
} from "../../types/Cache";
import { CacheContextProps } from "./context";
import { cacheResourceFuncs } from "./logic";

export interface ResourceComponentManagerProps {
  getState: () => CacheState;
}

export class ResourceComponentManager extends PureComponent<ResourceComponentManagerProps> {
  static contextType: Context<CacheContextProps>;
  declare context: ContextType<Context<CacheContextProps>>;
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
      const state = this.props.getState();
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
