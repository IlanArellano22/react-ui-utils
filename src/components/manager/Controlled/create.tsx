import {
  EventHandlerRegister,
  RegisterComponentManager,
  type ComponentRegister,
  type Status,
} from "./manager";
import createUncontrolledClassComponent, {
  UncontrolledComponent,
} from "../../uncontrolled";

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

export const register: RegisterManager = createUncontrolledClassComponent(
  RegisterComponentManager,
  {
    registerComponent: (instance, entry: ComponentRegister) => {
      instance().registerComponent(entry);
    },
    changeStatus: (instance, key: string, status: Status) => {
      instance().changeStatus(key, status);
    },
    getComponentDetails: (instance, key: string) => {
      const comp = instance().getComponentDetails(key);
      return comp;
    },
    getComponentHandler: (instance, key: string) => {
      const handler = instance().getComponentHandler(key);
      return handler;
    },
  }
);
