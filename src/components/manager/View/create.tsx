import React from "react";
import {
  ShowFunc,
  ShowFuncSync,
  ViewManagerComponent,
  ConditionView,
  ViewManagerComponentProps,
} from "./manager";
import { ViewProps } from "./comp";
import createUncontrolledClassComponent, {
  UncontrolledComponent,
} from "../../uncontrolled";
import { registerTreeComponent } from "./registerTreeComponent";
import { ViewTree } from "./tree";

export interface IViewManager
  extends UncontrolledComponent<ViewManagerComponentProps> {
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
  export const createViewManager = () => {
    const Tree = new ViewTree();

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

    const createViewContextComponent = registerTreeComponent(Tree);

    return {
      ...manager,
      Component: () => <manager.Component Tree={Tree} />,
      createViewContextComponent,
    };
  };
}
