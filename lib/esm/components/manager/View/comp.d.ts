import React from "react";
export declare type OnCloseResult<T> = undefined extends T ? (result?: T) => void : (result: T) => void;
export interface ViewProps<IResult = any> {
    onClose: OnCloseResult<IResult>;
}
export interface Entry {
    id: number;
    render: React.ComponentType<ViewProps>;
    props: ViewProps;
}
export interface ViewComponentProps {
    views: Entry[];
    nextId: number;
}
export declare function ViewMainComponent(props: ViewComponentProps): JSX.Element | null;
