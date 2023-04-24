import { EventHandler } from "../common/classes/EventHandler";
import { useRef } from "react";

const getId = (event: string) => `_${event}`;

/**Hook que genera un eventHandler donde se pueden suscribir callbacks en distintos eventos */
export default function useEventHandler<
  IEvents extends string,
  IValue = any
>() {
  const eventHandler = useRef(new EventHandler<IValue>()).current;

  const addEventListenner = (event: IEvents, fn: (value: IValue) => void) => {
    const id = getId(event);
    if (eventHandler.isSuscribed(id)) return;
    eventHandler.suscribe((value) => fn(value as IValue), id);
  };

  const removeEventListenner = (event: IEvents) => {
    const id = getId(event);
    eventHandler.clear(id);
  };

  const listen = (event: IEvents, value: IValue) => {
    const id = getId(event);
    eventHandler.setSelectedId(id);
    eventHandler.listen(value);
  };

  const listenAll = () => {
    eventHandler.listenAll();
  };

  const clearAll = () => {
    eventHandler.clearAll();
  };

  return {
    addEventListenner,
    removeEventListenner,
    listen,
    listenAll,
    clearAll,
  };
}
