import React from "react";
import { type ViewComponentProps, type ViewProps } from "./comp";
import { ViewManagerOptions } from "./create";
export interface ShowViewFunc {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>): Promise<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>): Promise<TProps extends ViewProps<infer TResult> ? TResult : unknown>;
}
export declare type ShowToastFunc<TProps> = (render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>) => void;
export interface ViewSyncResult<IResult> {
    start: () => void;
    /**Cierra el modal instanciado, devolviendo el resultado que previamente
     * fue seteado con la llamada @see `onClose` en caso de no ser llamado
     * devolvera undefined
     */
    close: () => IResult;
}
export interface ViewSyncOptions {
    duration: number;
    delay: number;
}
export interface ShowViewFuncSync {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>): ViewSyncResult<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>): TProps extends ViewProps<infer TResult> ? ViewSyncResult<TResult> : unknown;
}
interface ViewMainProps extends ViewManagerOptions {
}
export declare class ViewManagerComponent extends React.PureComponent<ViewMainProps, ViewComponentProps> {
    constructor(props: ViewMainProps);
    showView: (render: React.ComponentType<ViewProps>, props: {}) => PromiseLike<any>;
    private handleStartSync;
    showViewSync: (render: React.ComponentType<ViewProps>, props: {}, options?: Partial<ViewSyncOptions> | undefined) => ViewSyncResult<any>;
    removeAllEntries: () => void;
    removeAll: () => void;
    private addEntry;
    private removeEntry;
    private handleClose;
    private handleCloseSync;
    render(): JSX.Element;
}
export {};
