import { RegisterComponentManager, } from "./manager";
import createUncontrolledClassComponent from "../../uncontrolled";
export var register = createUncontrolledClassComponent(RegisterComponentManager, {
    registerComponent: function (instance, entry) {
        instance.registerComponent(entry);
    },
    changeStatus: function (instance, key, status) {
        instance.changeStatus(key, status);
    },
    getComponentDetails: function (instance, key) {
        var comp = instance.getComponentDetails(key);
        return comp;
    },
    getComponentHandler: function (instance, key) {
        var handler = instance.getComponentHandler(key);
        return handler;
    }
});
//# sourceMappingURL=create.js.map