import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer,
} from "react";
import { AppCacheAction, CacheState } from "../../types/Cache";
import { reducer } from "./logic/context";

export interface CacheContextProps {
  dispatch: Dispatch<AppCacheAction>;
}

export const createCacheContext = () => {
  const INITIAL_CACHE_CONTEXT: CacheContextProps = {
    dispatch: () => {},
  };

  const CacheContext = createContext(INITIAL_CACHE_CONTEXT);

  let _store: CacheState;

  const getState = () => _store;

  const CacheResourceProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, {} as CacheState);

    _store = state;

    return (
      <CacheContext.Provider value={{ dispatch }}>
        {children}
      </CacheContext.Provider>
    );
  };

  return {
    getState,
    CacheResourceProvider,
    CacheContext,
  };
};
