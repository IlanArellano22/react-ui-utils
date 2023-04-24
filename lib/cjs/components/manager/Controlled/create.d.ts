import { EventHandlerRegister, type ComponentRegister, type Status } from "./manager";
import { UncontrolledComponent } from "../../uncontrolled";
declare type Register = (entry: ComponentRegister) => void;
declare type ChangeStatus = (key: string, status: Status) => void;
declare type GetComponentHandler = (key: string) => EventHandlerRegister | undefined;
declare type GetComponentDetails = (key: string) => ComponentRegister | undefined;
export interface RegisterManager extends UncontrolledComponent<{}> {
    registerComponent: Register;
    changeStatus: ChangeStatus;
    getComponentHandler: GetComponentHandler;
    getComponentDetails: GetComponentDetails;
}
export declare const register: RegisterManager;
export {};
