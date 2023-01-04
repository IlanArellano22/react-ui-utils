import React from "react";
import {
  ShowViewFunc,
  ShowViewFuncSync,
  ViewManagerComponent,
} from "./manager";
import { ViewProps } from "./comp";

export interface ViewManager {
  Viewer: () => JSX.Element;
  show: ShowViewFunc;
  showSync: ShowViewFuncSync;
  removeAllEntries: () => void;
}

export interface ViewManagerOptions {
  limit?: number;
}

const NOT_INSTANCE_ERROR =
  "El componente aun no ha sido añadido al arbol de componentes o no esta siendo accesible";

/**Comentario */
export function createViewManager(
  options: Partial<ViewManagerOptions>
): ViewManager {
  let instance: ViewManagerComponent | undefined = undefined;
  let queue: ((instance: ViewManagerComponent) => void)[] = [];

  const processQueue = () => {
    while (instance && queue.length > 0) {
      const value = queue.pop();
      if (value) value(instance);
    }
  };

  const handleRef = (x: ViewManagerComponent) => {
    instance = x;
    processQueue();
  };

  const Viewer = () => (
    <ViewManagerComponent ref={handleRef} limit={options.limit} />
  );
  const show: ShowViewFunc = (
    render: React.ComponentType<ViewProps>,
    props?: any
  ) => {
    if (!instance) throw new Error(NOT_INSTANCE_ERROR);
    return new Promise((resolve) => {
      queue.push((i) => i.showView(render, props).then((x) => resolve(x)));
      processQueue();
    });
  };

  const showSync: ShowViewFuncSync = (
    render: React.ComponentType<ViewProps>,
    props?: any
  ) => {
    if (!instance) throw new Error(NOT_INSTANCE_ERROR);
    const value = instance.showViewSync(render, props);
    queue = [];
    return value;
  };

  const removeAllEntries: () => void = () => {
    if (!instance) throw new Error(NOT_INSTANCE_ERROR);
    queue.push((i) => i.removeAllEntries());
    processQueue();
  };

  return { Viewer, show, removeAllEntries, showSync };
}
