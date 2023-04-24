import { __assign } from "tslib";
import React, { useEffect } from "react";
import { register } from "./create";
/**Registra un componente dentro de una coleccion donde se controla es estado de dicho componente, asignandole a un EventHandler
 * donde se pueden suscribir varios eventos
 */
export function createMountHandlerComponent(ComponentWithRef, key) {
    if (!key)
        throw new Error("No hay ninguna key asignada a este EventHandler, se necesita un identificador para manejar el estatus y los eventos a los que el componente esta suscrito");
    return function (props) {
        useEffect(function () {
            register.registerComponent({
                key: key,
                status: "mounted"
            });
            return function () {
                register.changeStatus(key, "unmounted");
            };
        }, []);
        return React.createElement(ComponentWithRef, __assign({}, props));
    };
}
//# sourceMappingURL=createMountHandlerComponent.js.map