import createUncontrolledClassComponent from "../uncontrolled";
import { ResourceComponentManager } from "./manager";
var cacheResource = function (instance, name, resource, resourceConf) {
    var cacheRet = instance.cacheResource(name, resource, resourceConf);
    return cacheRet || {};
};
export var cacheResourceManager = createUncontrolledClassComponent(ResourceComponentManager, {
    cacheResource: cacheResource
});
//# sourceMappingURL=create.js.map