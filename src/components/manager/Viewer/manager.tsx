import React from "react";
import {
  type ViewComponentProps,
  type ViewEntry,
  type ViewProps,
  ViewMainComponent,
} from "./comp";

const MODAL_LIMIT = 3;

export interface ShowViewFunc {
  <TResult>(render: React.ComponentType<ViewProps<TResult>>): Promise<TResult>;
  <TProps>(
    render: React.ComponentType<TProps>,
    props?: Omit<TProps, keyof ViewProps<any>>
  ): Promise<TProps extends ViewProps<infer TResult> ? TResult : unknown>;
}

export type ShowToastFunc<TProps> = (
  render: React.ComponentType<TProps>,
  props?: Omit<TProps, keyof ViewProps<any>>
) => void;

export interface ViewSyncResult<IResult> {
  /**Cierra el modal instanciado, devolviendo el resultado que previamente
   * fue seteado con la llamada @see `onClose` en caso de no ser llamado
   * devolvera undefined
   */
  close: () => IResult;
}

export interface ShowViewFuncSync {
  <TResult>(
    render: React.ComponentType<ViewProps<TResult>>
  ): ViewSyncResult<TResult>;
  <TProps>(
    render: React.ComponentType<TProps>,
    props?: Omit<TProps, keyof ViewProps<any>>
  ): TProps extends ViewProps<infer TResult>
    ? ViewSyncResult<TResult>
    : unknown;
}

export class ViewManagerComponent extends React.PureComponent<
  {},
  ViewComponentProps
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      views: [],
      nextId: 0,
    };
  }

  showView = (
    render: React.ComponentType<ViewProps>,
    props: {}
  ): PromiseLike<any> => {
    return new Promise((resolve) => {
      if (this.state.views.length > MODAL_LIMIT) {
        resolve(undefined);
        return;
      }
      const currId = this.state.nextId;

      const entry: ViewEntry = {
        id: currId,
        render: render,
        props: {
          onClose: this.handleClose(currId, resolve),
          ...(props || {}),
        },
      };

      this.addEntry(entry);
    });
  };

  showViewSync = (
    render: React.ComponentType<ViewProps>,
    props: {}
  ): ViewSyncResult<any> => {
    if (this.state.views.length > MODAL_LIMIT)
      return { close: (() => this.removeAll()).bind(this) };
    const currId = this.state.nextId;
    let result: any;

    const entry: ViewEntry = {
      id: currId,
      render: render,
      props: {
        ...(props || {}),
        onClose: (res) => {
          result = res;
        },
      },
    };

    this.addEntry(entry);

    return { close: this.handleCloseSync(currId, result) };
  };

  removeAllEntries = () => {
    this.removeAll();
  };

  removeAll = () => {
    if (this.state.views.length === 0) return;
    this.setState(() => ({ views: [] }));
  };

  private removeSomeEntries = (condition: (x: ViewEntry) => boolean) => {
    if (this.state.views.length === 0) return;
    this.setState((prev) => ({ views: prev.views.filter(condition) }));
  };

  private addEntry = (entry: ViewEntry) => {
    this.setState((prev) => ({
      views: prev.views.concat(entry),
      nextId: prev.nextId + 1,
    }));
  };

  private removeEntry = (id: number) => {
    this.setState((prev) => ({
      views: prev.views.filter((view) => view.id !== id),
    }));
  };

  private handleClose =
    (id: number, resolve: (result: any) => void) => (result: any) => {
      resolve(result);

      this.removeEntry(id);
    };

  private handleCloseSync = (id: number, result: any) => () => {
    this.removeEntry(id);
    return result;
  };

  render() {
    return <ViewMainComponent {...this.state} />;
  }
}
