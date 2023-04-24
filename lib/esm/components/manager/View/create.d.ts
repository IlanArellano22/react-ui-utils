import { ShowFunc, ShowFuncSync, ConditionView, ViewManagerComponentProps } from "./manager";
import { UncontrolledComponent } from "../../uncontrolled";
export interface ViewManager extends UncontrolledComponent<ViewManagerComponentProps> {
    show: ShowFunc;
    showSync: ShowFuncSync;
    removeAllEntries: () => void;
    removeSomeEntries: (condition: ConditionView) => void;
}
/**Metodo que genera un compomponente que sirve para renderizar un arreglo de componentes dentro de su propio estado
 * el componente llama al metodo asincrono @see `show` para agregar un nuevo objeto que recive como parametros el
 * componente jsx que va a renderizar como componente, y las props que recibe el componente, cada metodo hereda
 * una propiedad @see `onClose` que al llamarse elimina el componente del estado devolviendo un resultado
 */
export declare const ViewManager: ViewManager;
