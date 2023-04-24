"use strict";
exports.__esModule = true;
exports.ViewManager = void 0;
var tslib_1 = require("tslib");
var manager_1 = require("./manager");
var uncontrolled_1 = (0, tslib_1.__importDefault)(require("../../uncontrolled"));
/**Metodo que genera un compomponente que sirve para renderizar un arreglo de componentes dentro de su propio estado
 * el componente llama al metodo asincrono @see `show` para agregar un nuevo objeto que recive como parametros el
 * componente jsx que va a renderizar como componente, y las props que recibe el componente, cada metodo hereda
 * una propiedad @see `onClose` que al llamarse elimina el componente del estado devolviendo un resultado
 */
exports.ViewManager = (0, uncontrolled_1["default"])(manager_1.ViewManagerComponent, {
    show: function (instance, render, props, context) {
        return new Promise(function (resolve) {
            instance.show(render, props, context).then(function (x) { return resolve(x); });
        });
    },
    showSync: function (instance, render, props, context) {
        return instance.showSync(render, props, context);
    },
    removeAllEntries: function (instance) {
        instance.removeAllEntries();
    },
    removeSomeEntries: function (instance, condition) {
        instance.removeSomeEntries(condition);
    }
});
//# sourceMappingURL=create.js.map