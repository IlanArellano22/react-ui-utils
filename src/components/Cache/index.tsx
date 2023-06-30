import React from "react";
import { CacheResourceProvider } from "./context";
import { cacheResourceManager } from "./create";

export namespace CacheResource {
  export const Cache = cacheResourceManager.cacheResource;

  export const Component = () => {
    return (
      <CacheResourceProvider>
        <cacheResourceManager.Component />
      </CacheResourceProvider>
    );
  };
}
