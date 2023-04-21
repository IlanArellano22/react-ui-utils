import React from "react";
import { CacheResourceProvider } from "./context";
import { cacheResourceManager } from "./create";

export const cacheResource = cacheResourceManager.cacheResource;

export const CacheResourceComponent = () => {
  return (
    <CacheResourceProvider>
      <cacheResourceManager.Component />
    </CacheResourceProvider>
  );
};
