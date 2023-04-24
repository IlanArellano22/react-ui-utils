"use strict";
exports.__esModule = true;
exports.createMountHandlerComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var create_1 = require("./create");
/**Registra un componente dentro de una coleccion donde se controla es estado de dicho componente, asignandole a un EventHandler
 * donde se pueden suscribir varios eventos
 */
function createMountHandlerComponent(ComponentWithRef, key) {
    if (!key)
        throw new Error("No hay ninguna key asignada a este EventHandler, se necesita un identificador para manejar el estatus y los eventos a los que el componente esta suscrito");
    return function (props) {
        (0, react_1.useEffect)(function () {
            create_1.register.registerComponent({
                key: key,
                status: "mounted"
            });
            return function () {
                create_1.register.changeStatus(key, "unmounted");
            };
        }, []);
        return react_1["default"].createElement(ComponentWithRef, (0, tslib_1.__assign)({}, props));
    };
}
exports.createMountHandlerComponent = createMountHandlerComponent;
//# sourceMappingURL=createMountHandlerComponent.js.map