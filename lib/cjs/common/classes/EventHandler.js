"use strict";
exports.__esModule = true;
exports.EventHandler = exports.getEventId = void 0;
var TOAST_ID = 0;
var getEventId = function (event) { return "_".concat(event); };
exports.getEventId = getEventId;
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        var _this = this;
        this.list = [];
        this.selectedId = undefined;
        this.isAnyEventSuscribed = function () { return !!_this.list.length; };
        this.isSuscribed = function (id) {
            return !!_this.selectedId &&
                _this.list.some(function (evt) { return evt.id === (id !== null && id !== void 0 ? id : _this.selectedId); });
        };
    }
    EventHandler.prototype.suscribe = function (callback, id) {
        this.list.push({ callback: callback, id: id !== null && id !== void 0 ? id : (TOAST_ID++).toString() });
    };
    EventHandler.prototype.listen = function (value) {
        var _this = this;
        if (!this.list.length)
            return;
        if (!this.selectedId) {
            var lastEvent = this.list.pop();
            return this.executeEvent(lastEvent, value);
        }
        var selectedEvent = this.list.find(function (evt) { return evt.id === _this.selectedId; });
        return this.executeEvent(selectedEvent, value);
    };
    EventHandler.prototype.executeEvent = function (event, value) {
        if (event && event.callback)
            event.callback(value);
    };
    EventHandler.prototype.listenAll = function () {
        this.list.forEach(function (evt) { return evt && evt.callback && evt.callback(); });
        this.clearAll();
    };
    EventHandler.prototype.clear = function (id) {
        var _this = this;
        this.list = this.list.filter(function (evt) { return evt.id !== (id !== null && id !== void 0 ? id : _this.selectedId); });
    };
    EventHandler.prototype.clearAll = function () {
        this.list = [];
        TOAST_ID = 0;
    };
    EventHandler.prototype.setSelectedId = function (id) {
        this.selectedId = id;
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map