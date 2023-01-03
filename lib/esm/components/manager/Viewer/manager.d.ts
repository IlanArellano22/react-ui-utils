import React from "react";
import { type ViewComponentProps, type ViewProps } from "./comp";
export interface ShowViewFunc {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>): Promise<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>): Promise<TProps extends ViewProps<infer TResult> ? TResult : unknown>;
}
export type ShowToastFunc<TProps> = (render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>) => void;
export interface ViewSyncResult<IResult> {
    /**Cierra el modal instanciado, devolviendo el resultado que previamente
     * fue seteado con la llamada @see `onClose` en caso de no ser llamado
     * devolvera undefined
     */
    close: () => IResult;
}
export interface ShowViewFuncSync {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>): ViewSyncResult<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>): TProps extends ViewProps<infer TResult> ? ViewSyncResult<TResult> : unknown;
}
export declare class ViewManagerComponent extends React.PureComponent<{}, ViewComponentProps> {
    constructor(props: {});
    showView: (render: React.ComponentType<ViewProps>, props: {}) => PromiseLike<any>;
    showViewSync: (render: React.ComponentType<ViewProps>, props: {}) => ViewSyncResult<any>;
    removeAllEntries: () => void;
    removeAll: () => void;
    private addEntry;
    private removeEntry;
    private handleClose;
    private handleCloseSync;
    render(): JSX.Element;
}
