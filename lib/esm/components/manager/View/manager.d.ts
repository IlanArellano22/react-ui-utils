import React from "react";
import { type ViewComponentProps, type Entry, type ViewProps } from "./comp";
export interface ShowFunc {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>, context?: string): Promise<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>, context?: string): Promise<TProps extends ViewProps<infer TResult> ? TResult : unknown>;
}
export type ShowToastFunc<TProps> = (render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>) => void;
export interface ViewSyncStartOptions {
    delay: number;
}
export interface ViewSyncResult<IResult> {
    start: (options?: Partial<ViewSyncStartOptions>) => void;
    /**Cierra el modal instanciado, devolviendo el resultado que previamente
     * fue seteado con la llamada @see `onClose` en caso de no ser llamado
     * devolvera undefined, si el modal fue previamente cerrado la funcion no
     * tendrá efecto
     */
    close: () => IResult;
}
export interface ShowFuncSync {
    <TResult>(render: React.ComponentType<ViewProps<TResult>>, context?: string): ViewSyncResult<TResult>;
    <TProps>(render: React.ComponentType<TProps>, props?: Omit<TProps, keyof ViewProps<any>>, context?: string): TProps extends ViewProps<infer TResult> ? ViewSyncResult<TResult> : ViewSyncResult<unknown>;
}
export type ConditionView = (x: Entry) => boolean;
export interface ViewManagerComponentProps {
    context?: boolean;
}
export declare class ViewManagerComponent extends React.PureComponent<ViewManagerComponentProps, ViewComponentProps> {
    constructor(props: ViewManagerComponentProps);
    show: (render: React.ComponentType<ViewProps>, props: {}, context?: string) => PromiseLike<any>;
    showSync: (render: React.ComponentType<ViewProps>, props: {}, context?: string) => ViewSyncResult<any>;
    private startModal;
    private startModalSync;
    removeSomeEntries: (condition?: ConditionView) => void;
    private addEntry;
    private removeEntry;
    private handleClose;
    private handleCloseSync;
    render(): JSX.Element;
}
