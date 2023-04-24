import React from "react";
import { CacheResourceProvider } from "./context";
import { cacheResourceManager } from "./create";
export var cacheResource = cacheResourceManager.cacheResource;
export var CacheResourceComponent = function () {
    return (React.createElement(CacheResourceProvider, null,
        React.createElement(cacheResourceManager.Component, null)));
};
//# sourceMappingURL=index.js.map