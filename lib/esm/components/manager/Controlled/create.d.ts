import { EventHandlerRegister, type ComponentRegister, type Status } from "./manager";
import { UncontrolledComponent } from "../../uncontrolled";
type Register = (entry: ComponentRegister) => void;
type ChangeStatus = (key: string, status: Status) => void;
type GetComponentHandler = (key: string) => EventHandlerRegister | undefined;
type GetComponentDetails = (key: string) => ComponentRegister | undefined;
export interface RegisterManager extends UncontrolledComponent<{}> {
    registerComponent: Register;
    changeStatus: ChangeStatus;
    getComponentHandler: GetComponentHandler;
    getComponentDetails: GetComponentDetails;
}
export declare const register: RegisterManager;
export {};
