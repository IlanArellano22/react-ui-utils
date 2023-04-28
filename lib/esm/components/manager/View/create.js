import { ViewManagerComponent, } from "./manager";
import createUncontrolledClassComponent from "../../uncontrolled";
/**Metodo que genera un compomponente que sirve para renderizar un arreglo de componentes dentro de su propio estado
 * el componente llama al metodo asincrono @see `show` para agregar un nuevo objeto que recive como parametros el
 * componente jsx que va a renderizar como componente, y las props que recibe el componente, cada metodo hereda
 * una propiedad @see `onClose` que al llamarse elimina el componente del estado devolviendo un resultado
 */
export var ViewManager = createUncontrolledClassComponent(ViewManagerComponent, {
    show: function (instance, render, props, context) {
        return new Promise(function (resolve) {
            instance.show(render, props, context).then(function (x) { return resolve(x); });
        });
    },
    showSync: function (instance, render, props, context) {
        return instance.showSync(render, props, context);
    },
    removeEntries: function (instance, condition) {
        instance.removeSomeEntries(condition);
    }
});
//# sourceMappingURL=create.js.map