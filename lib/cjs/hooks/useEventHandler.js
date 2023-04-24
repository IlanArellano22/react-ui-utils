"use strict";
exports.__esModule = true;
var EventHandler_1 = require("../common/classes/EventHandler");
var react_1 = require("react");
var getId = function (event) { return "_".concat(event); };
/**Hook que genera un eventHandler donde se pueden suscribir callbacks en distintos eventos */
function useEventHandler() {
    var eventHandler = (0, react_1.useRef)(new EventHandler_1.EventHandler()).current;
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
exports["default"] = useEventHandler;
//# sourceMappingURL=useEventHandler.js.map