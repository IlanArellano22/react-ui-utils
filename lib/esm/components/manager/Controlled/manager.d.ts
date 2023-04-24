import { EventHandler } from "../../../common/classes/EventHandler";
import { PureComponent } from "react";
export declare type Status = "mounted" | "unmounted";
export interface ComponentRegister {
    key: string;
    status: Status;
}
export interface EventHandlerRegister {
    key: string;
    event: EventHandler;
}
interface State {
    components: ComponentRegister[];
}
export declare class RegisterComponentManager extends PureComponent<any, State> {
    private componentMountEvents;
    constructor(props: any);
    registerComponent(entry: ComponentRegister): void;
    changeStatus(key: string, status: Status): void;
    private modifyEntry;
    getComponentDetails(key: string): ComponentRegister | undefined;
    getComponentHandler(key: string): EventHandlerRegister | undefined;
    private addEntry;
    render(): JSX.Element;
}
export {};
