import {
  ShowFunc,
  ShowFuncSync,
  ViewManagerComponent,
  ConditionView,
} from "./manager";
import { ViewProps } from "./comp";
import createUncontrolledClassComponent, {
  UncontrolledComponent,
} from "../../uncontrolled";
import { createViewContextComponent as BaseCreateContextComponent } from "../Controlled/viewContextComponent";

export interface IViewManager extends UncontrolledComponent {
  show: ShowFunc;
  showSync: ShowFuncSync;
  removeEntries: (condition?: ConditionView) => void;
}

/**Metodo que genera un compomponente que sirve para renderizar un arreglo de componentes dentro de su propio estado
 * el componente llama al metodo asincrono @see `show` para agregar un nuevo objeto que recive como parametros el
 * componente jsx que va a renderizar como componente, y las props que recibe el componente, cada metodo hereda
 * una propiedad @see `onClose` que al llamarse elimina el componente del estado devolviendo un resultado
 */
export namespace ViewManager {
  const manager: IViewManager = createUncontrolledClassComponent(
    ViewManagerComponent,
    {
      show: (
        instance,
        render: React.ComponentType<ViewProps>,
        props?: any,
        context?: string
      ) => {
        return new Promise((resolve) => {
          instance()
            .show(render, props, context)
            .then((x) => resolve(x));
        });
      },
      showSync: (
        instance,
        render: React.ComponentType<ViewProps>,
        props?: any,
        onCloseListenner?: any,
        context?: string
      ) => {
        return instance().showSync(render, props, onCloseListenner, context);
      },
      removeEntries: (instance, condition?: ConditionView) => {
        instance().removeSomeEntries(condition);
      },
    }
  );

  export const Component = manager.Component;

  export const isViewMounted = manager.isInstanceMounted;

  export const show = manager.show;

  export const showSync = manager.showSync;

  export const removeEntries = manager.removeEntries;

  export const createViewContextComponent = BaseCreateContextComponent;
}
