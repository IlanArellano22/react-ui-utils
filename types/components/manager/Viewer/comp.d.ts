import React from "react";
export type OnCloseResult<T> = undefined extends T ? (result?: T) => void : (result: T) => void;
export interface ViewProps<IResult = any> {
    onClose: OnCloseResult<IResult>;
}
export interface ViewEntry {
    id: number;
    render: React.ComponentType<ViewProps>;
    props: ViewProps;
}
export interface ViewComponentProps {
    views: ViewEntry[];
    nextId: number;
}
export declare function ViewMainComponent(props: ViewComponentProps): JSX.Element | null;
