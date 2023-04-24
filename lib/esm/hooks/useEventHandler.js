import { EventHandler } from "../common/classes/EventHandler";
import { useRef } from "react";
var getId = function (event) { return "_".concat(event); };
/**Hook que genera un eventHandler donde se pueden suscribir callbacks en distintos eventos */
export default function useEventHandler() {
    var eventHandler = useRef(new EventHandler()).current;
    var addEventListenner = function (event, fn) {
        var id = getId(event);
        if (eventHandler.isSuscribed(id))
            return;
        eventHandler.suscribe(function (value) { return fn(value); }, id);
    };
    var removeEventListenner = function (event) {
        var id = getId(event);
        eventHandler.clear(id);
    };
    var listen = function (event, value) {
        var id = getId(event);
        eventHandler.setSelectedId(id);
        eventHandler.listen(value);
    };
    var listenAll = function () {
        eventHandler.listenAll();
    };
    var clearAll = function () {
        eventHandler.clearAll();
    };
    return {
        addEventListenner: addEventListenner,
        removeEventListenner: removeEventListenner,
        listen: listen,
        listenAll: listenAll,
        clearAll: clearAll
    };
}
//# sourceMappingURL=useEventHandler.js.map