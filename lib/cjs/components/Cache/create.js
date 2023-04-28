"use strict";
exports.__esModule = true;
exports.cacheResourceManager = void 0;
var tslib_1 = require("tslib");
var uncontrolled_1 = tslib_1.__importDefault(require("../uncontrolled"));
var manager_1 = require("./manager");
var cacheResource = function (instance, name, resource, resourceConf) {
    var cacheRet = instance.cacheResource(name, resource, resourceConf);
    return cacheRet || {};
};
exports.cacheResourceManager = (0, uncontrolled_1["default"])(manager_1.ResourceComponentManager, {
    cacheResource: cacheResource
});
//# sourceMappingURL=create.js.map