import { EventHandler } from "../../../common/classes/EventHandler";
import { ValueHandler } from "../../../common/classes/ValueHandler";
import React, { PureComponent } from "react";

export type Status = "mounted" | "unmounted";

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

export class RegisterComponentManager extends PureComponent<any, State> {
  private componentMountEvents: ValueHandler<EventHandlerRegister[]>;
  constructor(props: any) {
    super(props);
    this.state = {
      components: [],
    };
    this.componentMountEvents = new ValueHandler([]);
  }

  public registerComponent(entry: ComponentRegister) {
    this.addEntry(entry);
  }

  public changeStatus(key: string, status: Status) {
    const index = this.state.components.findIndex((x) => x.key === key);
    if (index === -1) return;
    this.modifyEntry({ ...this.state.components[index], status }, index);
  }

  private modifyEntry(entry: ComponentRegister, index: number) {
    const newState = [...this.state.components];
    newState[index] = entry;
    this.setState({ components: newState });
    console.log("unmounted", { components: newState });
    if (entry.status === "unmounted" && this.componentMountEvents) {
      const MountRef = this.getComponentHandler(entry.key);
      if (MountRef) {
        MountRef.event.listen();
        MountRef.event.clear();
      }
    }
  }

  public getComponentDetails(key: string) {
    console.log({ key, components: this.state.components });
    return this.state.components.find((comp) => comp?.key === key);
  }

  public getComponentHandler(key: string) {
    return this.componentMountEvents.get().find((x) => x.key === key);
  }

  private addEntry(entry: ComponentRegister) {
    if (this.state.components.some((x) => x.key === entry.key)) {
      this.setState((prev) => ({
        components: prev.components.map((x) => {
          if (x.key === entry.key) return entry;
          return x;
        }),
      }));
      return;
    }
    this.setState((prev) => ({
      components: prev.components.concat(entry),
    }));
    if (this.componentMountEvents) {
      this.componentMountEvents.set(
        this.componentMountEvents.get().concat({
          key: entry.key,
          event: new EventHandler(),
        })
      );
    }
    console.log({
      entry,
      events: this.componentMountEvents,
    });
  }

  render() {
    return <></>;
  }
}
